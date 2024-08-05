using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Disease;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories
{
    public class DiseaseRepository : GenericRepository<Disease>, IDiseaseRepository
    {
        private readonly IMapper _mapper;

        public DiseaseRepository(IMapper mapper, JustinaDbContext context) : base(context)
        {
            _mapper = mapper;
        }
        public async Task<List<DiseaseGetDto>> GetAllDiseases()
        {
            var diseases = await _dbContext.Diseases
                .ProjectTo<DiseaseGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return diseases;
        }

        public async Task<List<Disease>> GetDiseasesByIds(List<Guid> diseaseIds)
        {
            return await _dbContext.Diseases.Where(x => diseaseIds.Contains(x.Id)).ToListAsync();
        }
    }

}
