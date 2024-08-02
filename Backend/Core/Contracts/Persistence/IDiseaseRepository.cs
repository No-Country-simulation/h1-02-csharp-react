using Domain.Entities;
using DTOs.Disease;

namespace Application.Contracts.Persistence
{
    public interface IDiseaseRepository : IGenericRepository<Disease>
    {
        Task<List<DiseaseGetDto>> GetAllDiseases();
        Task<List<Disease>> GetDiseasesByIds(List<Guid> diseaseIds);
    }
}
