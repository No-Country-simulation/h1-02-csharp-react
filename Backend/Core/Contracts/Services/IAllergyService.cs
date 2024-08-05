using DTOs.Allergy;
using DTOs;

namespace Application.Contracts.Services
{
    public interface IAllergyService
    {
        Task<ServiceResponse<List<AllergyGetDto>>> GetPatientAllergies(Guid patientId);
        Task<ServiceResponse<bool>> AddAllergies(List<AllergyUpdateDto> allergies, Guid patientId);
        Task<ServiceResponse<bool>> DeleteAllergy(Guid allergyId, Guid patientId);
    }
}
