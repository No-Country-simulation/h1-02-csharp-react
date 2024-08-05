using Amazon.S3;
using Application.Contracts.AWS;
using AWS.S3;
using Microsoft.Extensions.DependencyInjection;

namespace AWS;

public static class AddAwsServicesExtensions
{
    public static IServiceCollection AddAwsServices(this IServiceCollection services)
    {
        // Configurar AWS Options
        //services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());

        // Registrar servicios AWS
        services.AddAWSService<IAmazonS3>();
        services.AddScoped<IFileService, S3FileService>();

        return services;
    }
}