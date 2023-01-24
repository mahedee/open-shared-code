using Microsoft.AspNetCore.SignalR;

namespace SingnalR.API.HubConfig
{
    public class SignalrHub : Hub 
    {
        public async Task NewMessage(string user, string message)
        {
            await Clients.All.SendAsync("messageReceived", user, message);
        }


        public string GetConnectionId() => Context.ConnectionId;

        public string GetUserId()
        {
            var name = Context.GetHttpContext().Request.Query["username"];
            return name;
        }


        public async override Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(GetConnectionId(), $"user_{GetUserId()}");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(GetConnectionId(), $"user_{GetUserId()}");
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SubscribeToBoard(Guid boardId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, boardId.ToString());
            await Clients.Caller.SendAsync("Message", "Added to board successfully!");
        }
    }
}
