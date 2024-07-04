using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class PersistenceServiceExtensions
{
    public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration) 
    {
        services.AddDbContext<JustinaDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        return services;
    }
}
