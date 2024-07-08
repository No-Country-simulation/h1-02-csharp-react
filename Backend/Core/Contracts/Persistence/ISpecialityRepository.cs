using Domain.Entities;

namespace Application.Contracts.Persistence;

public interface ISpecialityRepository : IGenericRepository<Speciality>
{
    Task<Speciality> GetByNameAsync(string healthCareProviderId, string description);
}