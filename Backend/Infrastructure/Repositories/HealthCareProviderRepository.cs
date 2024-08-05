using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.HealthCareProvider;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories;


public class HealthCareProviderRepository : GenericRepository<HealthCareProvider>, IHealthCareProviderRepository
{
    private readonly IMapper _mapper;

    public HealthCareProviderRepository(JustinaDbContext dbContext, IMapper mapper) : base(dbContext)
    {
        _mapper = mapper;
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

    public async Task<GetByIdHealthCareProviderDto?> GetHealthCareProviderByCuil(string cuil)
    {
        return await _dbContext.HealthCareProviders
            .ProjectTo<GetByIdHealthCareProviderDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync(hcp => hcp.IdentificationNumber == cuil);
    }

}