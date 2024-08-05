using Domain.Entities;
using DTOs.Patient;

namespace Application.Contracts.Persistence
{
    public interface IPatientRepository : IGenericRepository<Patient>
    {
        public Task<PatientGetDto?> GetPatientById(Guid id);
        public Task<List<PatientGetDto>> GetAllPatients();
        public Task<Patient?> GetPatientWithRelationships(Guid id);
        public Task<Guid> GetPatientIdByUserId(Guid userId);
        public Task<PatientGetDto?> GetPatientByCuil(string cuil);
    }
}
