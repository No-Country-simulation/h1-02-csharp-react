using DTOs.Drug;
using DTOs;

namespace Application.Contracts.Services
{
    public interface IDrugService
    {
        Task<ServiceResponse<List<DrugGetDto>>> GetAllDrugs();
    }
}
