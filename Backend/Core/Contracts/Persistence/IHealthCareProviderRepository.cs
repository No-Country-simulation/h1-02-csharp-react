using Domain.Entities;

namespace Application.Contracts.Persistence;

public interface IHealthCareProviderRepository : IGenericRepository<HealthCareProvider>
{
    Task<HealthCareProvider?> GetByIdWithSpecialitiesAsync(Guid id);
}
