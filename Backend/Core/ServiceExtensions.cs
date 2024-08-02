using Application.Contracts.Services;
using Application.Services;
using Application.Validators.Authentication;
using FluentValidation;
using FluentValidation.AspNetCore;
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
        services.AddScoped<IMedicalTestService, MedicalTestService>();
        services.AddScoped<ITaskItemService, TaskItemService>();
        services.AddScoped<IMedicalCenterService, MedicalCenterService>();
        services.AddScoped<IAllergyService, AllergyService>();
        services.AddScoped<IDiseaseService, DiseaseService>();
        services.AddScoped<IDrugService, DrugService>();

        // FluentValidation configuration
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddControllers()
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<AuthenticationRequestValidator>());

        return services;
    }
}
