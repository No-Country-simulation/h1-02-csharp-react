using Domain.Entities;

namespace Application.Contracts.Persistence;

public interface IMedicalCenterRepository : IGenericRepository<MedicalCenter>
{
    Task<List<MedicalCenter?>> GetMedicalCentersWithUserAsync();
    Task<MedicalCenter?> GetByIdWithHealthCareProviderAsync(Guid id);
}