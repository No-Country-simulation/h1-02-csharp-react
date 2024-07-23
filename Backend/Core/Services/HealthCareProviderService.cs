using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using Domain.Entities;
using DTOs.HealthCareProvider;
using Microsoft.AspNetCore.Identity;

namespace Application.Services;

public class HealthCareProviderService : IHealthCareProviderService
{
    public readonly UserManager<ApplicationUser> _userManager;
    private readonly IHealthCareProviderRepository _healthCareProviderRepository;
    private readonly IMapper _mapper;

    public HealthCareProviderService(
        UserManager<ApplicationUser> userManager,
        IHealthCareProviderRepository healthCareProviderRepository,
        IMapper mapper)
    {
        _userManager = userManager;
        _healthCareProviderRepository = healthCareProviderRepository;
        _mapper = mapper;
    }

    public async Task<GetByIdHealthCareProviderDto> GetHealthCareProviderByIdAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        var hcp = await _healthCareProviderRepository
            .GetByConditionAsync(hp => hp.ApplicationUserId == user.Id);

        if (hcp == null) return null;

        var healthCareProvider = await _healthCareProviderRepository
            .GetByIdWithSpecialitiesAsync(hcp.Id);

        if (healthCareProvider == null) return null;


        var dto = _mapper.Map<GetByIdHealthCareProviderDto>(healthCareProvider);
        return dto;
    }

    public async Task<bool> UpdateHealthCareProviderAsync(Guid userId, UpdateHealthCareProviderDto updateDto)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());

        var userToUpdate = _mapper.Map(updateDto, user);

        var healthCareProvider = await _healthCareProviderRepository
                            .GetByConditionAsync(hp => hp.ApplicationUserId == user.Id);
        if (healthCareProvider == null)
            return false;

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
        return true;
    }

    public async Task<bool> UpdatePhoneNumber(string userId, UpdatePhoneNumberDto updatePhoneNumberDto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null) return false;

        user.PhoneNumber = updatePhoneNumberDto.PhoneNumber;
        var result = await _userManager.UpdateAsync(user);

        return true;
    }
}