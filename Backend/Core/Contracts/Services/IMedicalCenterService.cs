using DTOs;
using DTOs.MedicalCenter;

namespace Application.Contracts.Services;

public interface IMedicalCenterService
{
    Task<ServiceResponse<List<GetMedicalCentersDto>>> GetAllMedicalCenters();
    Task<ServiceResponse<GetByIdMedicalCenterDto>> GetMedicalCenterByIdAsync(Guid id);
}
