using DTOs.Disease;
using DTOs;

namespace Application.Contracts.Services
{
    public interface IDiseaseService
    {
        Task<ServiceResponse<List<DiseaseGetDto>>> GetAllDiseases();
    }
}
