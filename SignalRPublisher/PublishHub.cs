using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRPublisher
{
    public class PublishHub : Hub
    {
        public async Task SendToAll(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}