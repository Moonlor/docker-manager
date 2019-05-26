using Microsoft.AspNetCore.Builder;

namespace DockerMgr.Middleware
{
    public static class DockerWebSocketExtensions
    {
        public static IApplicationBuilder UseDockerWebSocket( this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<DockerWebsocketMiddleware>();
        }
    }
}