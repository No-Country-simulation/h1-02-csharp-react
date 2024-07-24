using Application.Contracts.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories;


public class HealthCareProviderRepository : GenericRepository<HealthCareProvider>, IHealthCareProviderRepository
{
    public HealthCareProviderRepository(JustinaDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<List<HealthCareProvider?>> GetHealthCareProvidersWithUserAsync()
    {
        return await _dbContext.HealthCareProviders
                        .Include(hp => hp.ApplicationUser)
                        .ToListAsync();
    }

    public async Task<HealthCareProvider?> GetByIdWithSpecialitiesAsync(Guid id)
    {
        return await _dbContext.HealthCareProviders
                        .Include(hp => hp.ApplicationUser)
                        .Include(hp => hp.HealthCareProviderSpecialities)
                        .ThenInclude(hps => hps.Speciality)
                        .FirstOrDefaultAsync(hp => hp.Id == id);
    }

}