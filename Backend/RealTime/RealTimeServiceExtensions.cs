using Application.Contracts.RealTime;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using RealTime.Notification;

namespace RealTime;

public static class RealTimeServiceExtensions
{
    public static IServiceCollection AddRealTimeServices(this IServiceCollection services)
    {
        services.AddTransient<INotificationService, NotificationService>();
        return services;
    }
}

public static class EndpointRouteBuilderExtensions
{
    public static IEndpointRouteBuilder MapHubs(this WebApplication app)
    {
        app.MapHub<NotificationHub>("/notificationHub");
        //app.MapHub<NotificationHub>("/notificationHub").RequireCors(builder =>
        //{
        //    builder.AllowAnyOrigin()
        //           .AllowAnyMethod()
        //           .AllowAnyHeader();
        //});

        return app;
    }
}
