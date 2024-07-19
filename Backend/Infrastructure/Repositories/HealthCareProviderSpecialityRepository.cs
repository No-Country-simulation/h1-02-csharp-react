using Application.Contracts.Persistence;
using Domain.Entities;
using Persistence.Data;

namespace Persistence.Repositories;

public class HealthCareProviderSpecialityRepository : GenericRepository<HealthCareProviderSpeciality>, IHealthCareProviderSpecialityRepository
{
    public HealthCareProviderSpecialityRepository(JustinaDbContext dbContext) : base(dbContext)
    {
    }
}