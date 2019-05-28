using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Docker.DotNet;
using Microsoft.AspNetCore.Http;
namespace DockerMgr.Middleware 
{
    public class DockerWebsocketMiddleware 
    {
        /// <summary>
        /// 管道代理对象
        /// </summary>
        private readonly RequestDelegate _next;
        
        public DockerWebsocketMiddleware(RequestDelegate next) 
        {
            _next = next;
        }
        
        /// <summary>
        /// 中间件调用
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context) 
        {
            // 判断是否为websocket请求
            if (context.WebSockets.IsWebSocketRequest)
            {
                if (context.Request.Path == "/ws")
                {
                    if (context.WebSockets.IsWebSocketRequest) 
                    {
                        string token = context.Request.Query["token"];
                        string ip = context.Request.Query["ip"];
                        WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
                        await Echo(context, webSocket, token, ip);
                    } else 
                    {
                        context.Response.StatusCode = 400;
                    }
                }
            }
            
            // await this._next(context);
        }
        
        private async Task Echo(HttpContext context, WebSocket _webSocket, string token, string ip) 
        {
            string id = token;
            var client = new DockerClientConfiguration(new Uri($"http://{ip}:2375")).CreateClient();
            
            var execCreateResp = await client.Containers.ExecCreateContainerAsync(
                id,
                new Docker.DotNet.Models.ContainerExecCreateParameters()
                {
                    AttachStderr = true,
                    AttachStdin = true,
                    AttachStdout = true,
                    Cmd = new string[] {"/bin/sh",
                        "-c",
                        "TERM=xterm-256color; export TERM; [ -x /bin/bash ] && ([ -x /usr/bin/script ] && /usr/bin/script -q -c \"/bin/bash\" /dev/null || exec /bin/bash) || exec /bin/sh"},
                        Detach = false,
                        Tty = true,
                        Privileged = true
                });
            
                using (var stream = await client.Containers.StartAndAttachContainerExecAsync(execCreateResp.ID, false, default(CancellationToken))) 
                {
                    // Get Info of Exec Instance
                    var execInspectResp = await client.Containers.InspectContainerExecAsync(execCreateResp.ID, default(CancellationToken));
                    var pid = execInspectResp.Pid;
                    
                    // Read from Docker to WS
                    var tRead = Task.Run(async () =>
                        {
                            var dockerBuffer = System.Buffers.ArrayPool<byte>.Shared.Rent(81920);
                            try
                            {
                                while (true)
                                {
                                    // Clear buffer
                                    Array.Clear(dockerBuffer, 0, dockerBuffer.Length); 
                                    var dockerReadResult = await stream.ReadOutputAsync(dockerBuffer, 0, dockerBuffer.Length, default(CancellationToken)); 
                                    if (dockerReadResult.EOF) 
                                        break; 
                                    if (dockerReadResult.Count > 0)
                                    {
                                        bool endOfMessage = true;
                                        await _webSocket.SendAsync(new ArraySegment<byte>(dockerBuffer, 0, dockerReadResult.Count), WebSocketMessageType.Text, endOfMessage, CancellationToken.None); 
                                    } else
                                        break;
                                }
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"{ex} Failure during Read from Docker Exec to WebSocket");
                            }
                            System.Buffers.ArrayPool<byte>.Shared.Return(dockerBuffer);
                            
                        });
                    
                    // Write WS to Docker                             
                    var tWrite = Task.Run(async () =>
                    {
                        WebSocketReceiveResult wsReadResult = null;
                        // Read only small amount of chars at once (performance)!
                        var wsBuffer = System.Buffers.ArrayPool<byte>.Shared.Rent(10); 
                        try 
                        { 
                            while (true) 
                            { 
                                // Clear buffer
                                Array.Clear(wsBuffer, 0, wsBuffer.Length);
                                        
                                wsReadResult = await _webSocket.ReceiveAsync(new ArraySegment<byte>(wsBuffer), CancellationToken.None); 
                                await stream.WriteAsync(wsBuffer, 0, wsBuffer.Length, default(CancellationToken));
                                        
                                if (wsReadResult.CloseStatus.HasValue) 
                                { 
                                    // _logger.LogInformation($"Stop Container Console (env-id: {environment.Id}, pid: {pid}");
                                    var killSequence = Encoding.ASCII.GetBytes($"exit{Environment.NewLine}"); 
                                    await stream.WriteAsync(killSequence, 0, killSequence.Length, 
                                        default(CancellationToken));
                                    break;
                                }
                            }
                        }
                        catch (Exception ex) 
                        { 
                            Console.WriteLine(ex); 
                            // _logger.LogError(ex, "Failure during Write to Docker Exec from WebSocket");
                        } 
                        System.Buffers.ArrayPool<byte>.Shared.Return(wsBuffer);
                                
                    });
                    
                    await tRead;
                    await tWrite;
                        
                }
        }
    }
}