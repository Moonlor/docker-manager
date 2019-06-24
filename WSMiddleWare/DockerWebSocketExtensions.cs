using Microsoft.AspNetCore.Builder;

namespace WSMiddleWare
{
    public static class DockerWebSocketExtensions
    {
        public static IApplicationBuilder UseDockerWebSocket( this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<DockerWebsocketMiddleware>();
        }
    }
}