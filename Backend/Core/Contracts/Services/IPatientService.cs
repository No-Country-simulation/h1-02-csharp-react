using DTOs;
using DTOs.Patient;

namespace Application.Contracts.Services
{
    public interface IPatientService
    {
        Task<ServiceResponse<PatientGetDto>> GetPatientById(Guid id);
        Task<ServiceResponse<List<PatientGetDto>>> GetAllPatients();
        Task<ServiceResponse<bool>> UpdatePatient(Guid patientId, PatientUpdateDto updateRequest);
        Task<ServiceResponse<bool>> DeletePatient(Guid patientId);
    }
}
