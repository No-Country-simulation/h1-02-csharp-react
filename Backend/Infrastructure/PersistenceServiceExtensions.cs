﻿using Persistence.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Contracts.Persistence;
using Persistence.Repositories;
using Persistence.Interceptors;

namespace Persistence;

public static class PersistenceServiceExtensions
{
    public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<SoftDeleteInterceptor>();

        services.AddDbContext<JustinaDbContext>(
            (sp, options) => options
            .UseSqlServer(configuration
            .GetConnectionString("DefaultConnection"))
            .AddInterceptors(sp.GetRequiredService<SoftDeleteInterceptor>()));

        services.AddScoped<IHealthCareProviderRepository, HealthCareProviderRepository>();
        services.AddScoped<ISpecialityRepository, SpecialityRepository>();
        services.AddScoped<IPatientRepository, PatientRepository>();
        services.AddScoped<IMedicalCenterRepository, MedicalCenterRepository>();
        services.AddScoped<IRecordRepository, RecordRepository>();
        services.AddScoped<INoteRepository, NoteRepository>();
        services.AddScoped<IMedicalTestRepository, MedicalTestRepository>();
        services.AddScoped<ITaskItemRepository, TaskItemRepository>();
        services.AddScoped<IAllergyRepository, AllergyRepository>();
        services.AddScoped<IDiseaseRepository, DiseaseRepository>();
        services.AddScoped<IDrugRepository, DrugRepository>();
        services.AddScoped<IPathologyRepository, PathologyRepository>();

        return services;
    }
}
