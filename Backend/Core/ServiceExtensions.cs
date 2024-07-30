using Application.Contracts.Services;
using Application.Services;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Application;

public static class ServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        // add services
        services.AddScoped<IPatientService, PatientService>();
        services.AddScoped<IHealthCareProviderService, HealthCareProviderService>();
        services.AddScoped<ISpecialityService, SpecialityService>();
        services.AddScoped<IRecordService, RecordService>();
        services.AddScoped<INoteService, NoteService>();


        // FluentValidation configuration
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        return services;
    }
}
