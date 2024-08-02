using Domain.Entities;
using DTOs.Allergy;

namespace Application.Contracts.Persistence
{
    public interface IAllergyRepository : IGenericRepository<Allergy>
    {
        Task<List<AllergyGetDto>> GetPatientAllergies(Guid patientId);
        Task<bool> DeleteAllergy(Guid allergyId, Guid patientId);
    }
}
