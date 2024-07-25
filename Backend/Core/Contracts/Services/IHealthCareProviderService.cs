using DTOs;
using DTOs.HealthCareProvider;

namespace Application.Contracts.Services;

public interface IHealthCareProviderService
{
    Task<ServiceResponse<List<GetHealthCareProvidersDto>>> GetAllHealthCareProviders();
    Task<ServiceResponse<GetByIdHealthCareProviderDto>> GetHealthCareProviderByIdAsync(string userId);
    Task<ServiceResponse<bool>> UpdateHealthCareProviderAsync(Guid userId, UpdateHealthCareProviderDto updateDto);
    Task<ServiceResponse<bool>> UpdatePhoneNumber(string userId, UpdatePhoneNumberDto updatePhoneNumberDto);
    Task<ServiceResponse<bool>> DeleteHealthCareProvider(Guid id);
}
