using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Patient;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories
{
    public class PatientRepository : GenericRepository<Patient>, IPatientRepository
    {
        private readonly IMapper _mapper;
        public PatientRepository(IMapper mapper, JustinaDbContext context) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<PatientGetDto>> GetAllPatients()
        {
            var patients = await _dbContext.Patients
                .ProjectTo<PatientGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return patients;
        }

        public async Task<PatientGetDto?> GetPatientById(Guid id)
        {
            return await _dbContext.Patients
                .ProjectTo<PatientGetDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PatientGetDto?> GetPatientByCuil(string cuil)
        {
            return await _dbContext.Patients
                .ProjectTo<PatientGetDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.IdentificationNumber == cuil);
        }

        public async Task<Patient?> GetPatientWithRelationships(Guid id)
        {
            return await _dbContext.Patients
                .Include(p => p.ApplicationUser)
                .Include(p => p.Diseases)
                .Include(p => p.Drugs)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Guid> GetPatientIdByUserId(Guid userId)
        {
            return await _dbContext.Patients
                .Where(p => p.ApplicationUserId == userId)
                .Select(p => p.Id)
                .FirstOrDefaultAsync();
        }
    }
}
