namespace Application.Contracts.RealTime;

public interface INotificationService
{
    Task SendNotificationAsync(string message);
}
