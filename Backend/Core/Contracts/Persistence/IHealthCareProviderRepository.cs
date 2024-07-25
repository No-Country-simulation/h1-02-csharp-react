using Domain.Entities;

namespace Application.Contracts.Persistence;

public interface IHealthCareProviderRepository : IGenericRepository<HealthCareProvider>
{
    Task<List<HealthCareProvider?>> GetHealthCareProvidersWithUserAsync();
    Task<HealthCareProvider?> GetByIdWithSpecialitiesAsync(Guid id);
}
