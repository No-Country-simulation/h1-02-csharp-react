using Application.Contracts.GoogleCloudSpeech;
using GoogleCloudSpeech.Services;
using GoogleCloudSpeech.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GoogleCloudSpeech;

public static class AddGoogleCloudSpeechServicesExtensions
{
    public static IServiceCollection AddGoogleCloudSpeechServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<GoogleCloudSettings>(configuration.GetSection("GoogleCloud"));
        services.AddTransient<ISpeechToTextService, GoogleSpeechToTextService>();
        services.AddHttpClient<GoogleSpeechToTextService>();

        return services;
    }
}
