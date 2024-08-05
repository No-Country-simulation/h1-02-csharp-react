using Domain.Entities;
using DTOs.Drug;

namespace Application.Contracts.Persistence
{
    public interface IDrugRepository : IGenericRepository<Drug>
    {
        Task<List<DrugGetDto>> GetAllDrugs();
        Task<List<Drug>> GetDrugsByIds(List<Guid> drugsIds);
    }
}
