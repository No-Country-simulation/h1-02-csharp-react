using Domain.Entities;
using DTOs.HealthCareProvider;

namespace Application.Contracts.Persistence;

public interface IHealthCareProviderRepository : IGenericRepository<HealthCareProvider>
{
    Task<List<HealthCareProvider?>> GetHealthCareProvidersWithUserAsync();
    Task<HealthCareProvider?> GetByIdWithSpecialitiesAsync(Guid id);
    Task<GetByIdHealthCareProviderDto?> GetHealthCareProviderByCuil(string cuil);
}
