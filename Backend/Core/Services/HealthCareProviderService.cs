using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using Domain.Entities;
using DTOs;
using DTOs.HealthCareProvider;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class HealthCareProviderService : IHealthCareProviderService
{
    public readonly UserManager<ApplicationUser> _userManager;
    private readonly IHealthCareProviderRepository _healthCareProviderRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<HealthCareProviderService> _logger;

    public HealthCareProviderService(
        UserManager<ApplicationUser> userManager,
        IHealthCareProviderRepository healthCareProviderRepository,
        IMapper mapper,
        ILogger<HealthCareProviderService> logger)
    {
        _userManager = userManager;
        _healthCareProviderRepository = healthCareProviderRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ServiceResponse<List<GetHealthCareProvidersDto>>> GetAllHealthCareProviders()
    {
        var serviceResponse = new ServiceResponse<List<GetHealthCareProvidersDto>>();

        try
        {
            var healthCareProviders = await _healthCareProviderRepository.GetHealthCareProvidersWithUserAsync();
            serviceResponse.Data = _mapper.Map<List<GetHealthCareProvidersDto>>(healthCareProviders);
            serviceResponse.Message = "List Health Care Providers";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex.Message);
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<GetByIdHealthCareProviderDto>> GetHealthCareProviderByIdAsync(string userId)
    {
        var serviceResponse = new ServiceResponse<GetByIdHealthCareProviderDto>();

        try
        {
            var healthCareProviderId = new Guid(userId);

            var healthCareProviderSpecialities = await _healthCareProviderRepository
                .GetByIdWithSpecialitiesAsync(healthCareProviderId);

            if (healthCareProviderSpecialities == null)
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                return serviceResponse;
            }

            serviceResponse.Data = _mapper.Map<GetByIdHealthCareProviderDto>(healthCareProviderSpecialities);
            serviceResponse.Message = "List Health Care Providers";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"{ex.Message}");
        }

        return serviceResponse;
    }


    public async Task<ServiceResponse<GetByIdHealthCareProviderDto>> GetHealthCareProviderByCuil(string cuil)
    {
        var serviceResponse = new ServiceResponse<GetByIdHealthCareProviderDto>();
        try
        {
            serviceResponse.Data = await _healthCareProviderRepository.GetHealthCareProviderByCuil(cuil);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"{ex.Message}");
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<bool>> UpdateHealthCareProviderAsync(Guid userId, UpdateHealthCareProviderDto updateDto)
    {
        var serviceResponse = new ServiceResponse<bool>();

        try
        {
            var healthCareProvider = await _healthCareProviderRepository
                                                .GetByIdWithSpecialitiesAsync(userId);

            if (healthCareProvider == null)
            {
                serviceResponse.Data = false;
                serviceResponse.Success = false;
                return serviceResponse;
            }

            // add new relations to specialities

            foreach (var speciality in updateDto.SpecialityIds)
            {
                healthCareProvider.HealthCareProviderSpecialities.Add(new HealthCareProviderSpeciality
                {
                    SpecialityId = speciality
                });
            }

            var providerToUpdate = _mapper.Map(updateDto, healthCareProvider);

            _healthCareProviderRepository.Update(providerToUpdate);
            await _healthCareProviderRepository.SaveChangesAsync();

            serviceResponse.Data = true;
            serviceResponse.Message = "List Health Care Providers";

        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"{ex.Message}");
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<bool>> UpdatePhoneNumber(string userId, UpdatePhoneNumberDto updatePhoneNumberDto)
    {
        var serviceResponse = new ServiceResponse<bool>();

        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                serviceResponse.Data = false;
                serviceResponse.Success = false;
                return serviceResponse;
            }

            user.PhoneNumber = updatePhoneNumberDto.PhoneNumber;
            await _userManager.UpdateAsync(user);

            serviceResponse.Data = true;
            serviceResponse.Message = "List Health Care Providers";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"{ex.Message}");
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<string>> UpdateContactInfoAsync(string userId, UpdateContactInfoDto updateContactInfoDto)
    {
        var response = new ServiceResponse<string>();

        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found.";
                return response;
            }

            if (!string.IsNullOrEmpty(updateContactInfoDto.PhoneNumber))
            {
                user.PhoneNumber = updateContactInfoDto.PhoneNumber;
            }

            if (!string.IsNullOrEmpty(updateContactInfoDto.NewPassword) && !string.IsNullOrEmpty(updateContactInfoDto.CurrentPassword))
            {
                var result = await _userManager.ChangePasswordAsync(user, updateContactInfoDto.CurrentPassword, updateContactInfoDto.NewPassword);
                if (!result.Succeeded)
                {
                    if (result.Errors.Any(e => e.Code == "PasswordMismatch"))
                    {
                        response.Success = false;
                        response.Message = "Current password is incorrect.";
                        response.Data = "PasswordMismatch";
                        return response;
                    }

                    response.Success = false;
                    response.Message = string.Join(", ", result.Errors.Select(e => e.Description));
                    return response;
                }
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                response.Success = false;
                response.Message = string.Join(", ", updateResult.Errors.Select(e => e.Description));
                return response;
            }

            response.Success = true;
            response.Message = "Contact information updated successfully.";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating contact information.");
            response.Success = false;
            response.Message = "An error occurred while updating contact information.";
        }

        return response;
    }

    public async Task<ServiceResponse<bool>> DeleteHealthCareProvider(Guid id)
    {
        var serviceResponse = new ServiceResponse<bool>();

        try
        {
            await _healthCareProviderRepository.DeleteAsync(id);
            await _healthCareProviderRepository.SaveChangesAsync();

            serviceResponse.Data = true;
            serviceResponse.Message = "Health Care Provider deleted successfully.";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, ex.Message);
        }

        return serviceResponse;
    }
}