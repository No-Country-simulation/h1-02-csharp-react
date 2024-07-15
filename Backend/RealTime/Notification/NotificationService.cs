using Application.Contracts.RealTime;
using Microsoft.AspNetCore.SignalR;

namespace RealTime.Notification;

public class NotificationService : INotificationService
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationService(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendNotificationAsync(string message)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
    }
}
