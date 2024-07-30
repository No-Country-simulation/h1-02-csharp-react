using Application.Contracts.Persistence;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories;

public class MedicalCenterRepository : GenericRepository<MedicalCenter>, IMedicalCenterRepository
{
    public MedicalCenterRepository(JustinaDbContext dbContext) : base(dbContext)
    {
    }

    public async Task<List<MedicalCenter?>> GetMedicalCentersWithUserAsync()
    {
        return await _dbContext.MedicalCenters
                        .Include(hp => hp.ApplicationUser)
                        .ToListAsync();
    }

    public async Task<MedicalCenter?> GetByIdWithHealthCareProviderAsync(Guid id)
    {
        return await _dbContext.MedicalCenters
                        .Include(mc => mc.ApplicationUser)
                        .Include(mc => mc.HealthCareProviderMedicalCenters)
                        .ThenInclude(hpm => hpm.HealthCareProvider)
                        .ThenInclude(hcp => hcp.ApplicationUser)
                        .FirstOrDefaultAsync(mc => mc.Id == id);
    }

}
