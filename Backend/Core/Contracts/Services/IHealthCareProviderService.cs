using DTOs.HealthCareProvider;

namespace Application.Contracts.Services;

public interface IHealthCareProviderService
{
    Task<bool> UpdateHealthCareProviderAsync(string userId, HealthCareProviderUpdateDto updateDto);
}
