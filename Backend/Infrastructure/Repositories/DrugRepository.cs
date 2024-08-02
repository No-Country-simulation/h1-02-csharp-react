using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Drug;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories
{
    public class DrugRepository : GenericRepository<Drug>, IDrugRepository
    {
        private readonly IMapper _mapper;

        public DrugRepository(IMapper mapper, JustinaDbContext context) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<DrugGetDto>> GetAllDrugs()
        {
            var drugs = await _dbContext.Drugs
                .ProjectTo<DrugGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return drugs;
        }

        public async Task<List<Drug>> GetDrugsByIds(List<Guid> drugsIds)
        {
            return await _dbContext.Drugs
                .Where(x => drugsIds.Contains(x.Id))
                .ToListAsync();
        }
    }
}
