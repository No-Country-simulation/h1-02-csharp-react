using Microsoft.Extensions.DependencyInjection;

namespace Core
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddCoreServiceCollection(this IServiceCollection services)
        {
            return services;
        }
    }
}
