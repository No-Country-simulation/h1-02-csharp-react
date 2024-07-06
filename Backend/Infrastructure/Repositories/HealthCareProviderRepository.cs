using Application.Contracts.Persistence;
using Domain.Entities;
using Persistence.Data;

namespace Persistence.Repositories;


public class HealthCareProviderRepository : GenericRepository<HealthCareProvider>, IHealthCareProviderRepository
{
    public HealthCareProviderRepository(JustinaDbContext dbContext) : base(dbContext)
    {
    }
}