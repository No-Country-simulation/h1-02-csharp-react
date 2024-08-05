using Application.Contracts.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories;

public class SpecialityRepository : GenericRepository<Speciality>, ISpecialityRepository
{
    public SpecialityRepository(JustinaDbContext context) : base(context)
    {
    }

    public async Task<Speciality> GetByNameAsync(string description)
    {
        return await _dbContext.Set<Speciality>()
                             .FirstOrDefaultAsync(
                                s => s.Description == description);
    }

    public async Task<IEnumerable<Speciality>> GetSpecialitiesByIds(IEnumerable<Guid> specialityIds)
    {
        return await _dbContext.Specialities
            .Where(x => specialityIds.Contains(x.Id))
            .ToListAsync();
    }

    public async Task<Speciality?> GetByIdWithHealthCareProviderAsync(Guid id)
    {
        return await _dbContext.Specialities
                        .Include(hp => hp.HealthCareProviderSpecialities)
                        .ThenInclude(hps => hps.HealthCareProvider)
                        .ThenInclude(hp => hp.ApplicationUser)
                        .FirstOrDefaultAsync(hp => hp.Id == id);
    }
}