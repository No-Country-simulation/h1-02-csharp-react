using Application;
using Domain.Entities;
using Mappings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;
using Persistence.Data;
using Persistence.Identity;
using RealTime;

namespace API;

public static class StartupExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddApplicationServices();
        builder.Services.AddPersistenceServices(builder.Configuration);
        builder.Services.AddIdentityServices(builder.Configuration);
        builder.Services.AddRealTimeServices();
        builder.Services.AddDomainProfiles();

        builder.Services.AddHttpContextAccessor();

        builder.Services.AddSwagger();

        builder.Services.AddControllers();

        builder.Services.AddSignalR();

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder
                   .WithOrigins("https://justinaio-app.netlify.app/*")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
            });
        });

        return builder.Build();
    }

    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Justina API");
            });
        }

        app.UseHttpsRedirection();
        app.UseRouting();

        //app.UseCors("Open");
        app.UseCors();

        // RealTime 
        app.MapHubs();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Justina API v1");
            //c.RoutePrefix = string.Empty; // Para que Swagger UI esté en la raíz
        });

        app.MapControllers();

        return app;

    }

    private static void AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Justina API",

            });

            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = @"JWT Authorization header using the Bearer scheme. \n\n 
                   Enter 'Bearer' [space] and then your token in the text input below.
                   \n\nExample: 'Bearer 12345abcdef'",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http, //ApiKey
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                 {
                   new OpenApiSecurityScheme
                   {
                     Reference = new OpenApiReference
                     {
                       Type = ReferenceType.SecurityScheme,
                       Id = "Bearer"
                     },
                     Scheme = "oauth2",
                     Name = "Bearer",
                     In = ParameterLocation.Header,

                   },
                   new List<string>()
                 }
            });

        });
    }

    public static async Task InitializeDatabase(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();

        var services = scope.ServiceProvider;

        try
        {
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            await DbInitializer.InitializeAsync(services, userManager);
        }
        catch (Exception ex)
        {
            // Log errors or handle them as appropriate
            //var logger = services.GetRequiredService<ILogger<Program>>();
            //logger.LogError(ex, "An error occurred while seeding the database.");
        }
    }

    public static async Task ResetDatabaseAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        try
        {
            var context = scope.ServiceProvider.GetService<JustinaDbContext>();
            if (context != null)
            {
                await context.Database.EnsureDeletedAsync();
                await context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            var logger = scope.ServiceProvider.GetRequiredService<ILogger>();
            logger.LogError(ex, "An error occurred while migrating the database.");
        }
    }
}