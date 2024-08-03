using Domain.Entities;
using DTOs.Pathology;

namespace Application.Contracts.Persistence;

public interface IPathologyRepository : IGenericRepository<Pathology>
{
    Task<List<GetPathologiesDto>> GetAllPathologies();
}