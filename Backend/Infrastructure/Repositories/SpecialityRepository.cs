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

    public async Task<Speciality> GetByNameAsync(string healthCareProviderId, string description)
    {
        return await _dbContext.Set<Speciality>()
                             .FirstOrDefaultAsync(
                                s => s.Description == description &&
                                s.HealthCareProviderId == healthCareProviderId);
    }
}