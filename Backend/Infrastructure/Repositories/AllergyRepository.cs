using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Allergy;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories
{
    public class AllergyRepository : GenericRepository<Allergy>, IAllergyRepository
    {
        private readonly IMapper _mapper;

        public AllergyRepository(IMapper mapper, JustinaDbContext context) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<AllergyGetDto>> GetPatientAllergies(Guid patientId)
        {
            return await _dbContext.Allergies
                .Where(a => a.PatientId == patientId)
                .ProjectTo<AllergyGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> DeleteAllergy(Guid allergyId, Guid patientId)
        {
            var dbAllergy = await _dbContext.Allergies.FirstOrDefaultAsync(a => a.Id == allergyId && a.PatientId == patientId);
            var result = DeleteAsync(dbAllergy);

            return result;
        }
    }
}
