using Application.Contracts.Services;
using Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Application;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // add services
        services.AddScoped<IPatientService, PatientService>();
        services.AddScoped<IHealthCareProviderService, HealthCareProviderService>();

        return services;
    }
}
