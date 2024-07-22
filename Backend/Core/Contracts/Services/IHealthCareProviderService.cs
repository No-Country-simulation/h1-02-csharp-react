using DTOs.HealthCareProvider;

namespace Application.Contracts.Services;

public interface IHealthCareProviderService
{
    Task<GetByIdHealthCareProviderDto> GetHealthCareProviderByIdAsync(string userId);
    Task<bool> UpdateHealthCareProviderAsync(Guid userId, UpdateHealthCareProviderDto updateDto);
    Task<bool> UpdatePhoneNumber(string userId, UpdatePhoneNumberDto updatePhoneNumberDto);
}
