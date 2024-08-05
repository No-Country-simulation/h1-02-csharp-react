using DTOs;
using DTOs.Pathology;

namespace Application.Contracts.Services;

public interface IPathologyService
{
    Task<ServiceResponse<List<GetPathologiesDto>>> GetAllPathologies();
}
