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
    private readonly IGenericRepository<HealthCareProviderSpeciality> _healthCareProviderSpecialityRepository;
    private readonly IMapper _mapper;

    public HealthCareProviderService(
        UserManager<ApplicationUser> userManager,
        IHealthCareProviderRepository healthCareProviderRepository,
        IGenericRepository<HealthCareProviderSpeciality> healthCareProviderSpecialityRepository,
        IMapper mapper)
    {
        _userManager = userManager;
        _healthCareProviderRepository = healthCareProviderRepository;
        _healthCareProviderSpecialityRepository = healthCareProviderSpecialityRepository;
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

        var hcp = await _healthCareProviderRepository
                            .GetByConditionAsync(hp => hp.ApplicationUserId == user.Id);
        if (hcp == null)
            return false;

        // delete existing relations
        var existingSpecialities = await _healthCareProviderSpecialityRepository
                                            .GetAllPredicateAsync(hps =>
                                                hps.HealthCareProviderId == hcp.Id);

        foreach (var speciality in existingSpecialities)
        {
            await _healthCareProviderSpecialityRepository.DeleteAsync(speciality);
        }
        await _healthCareProviderSpecialityRepository.SaveChangesAsync();

        // add new relations to specialities
        foreach (var specialityId in updateDto.SpecialityIds)
        {
            var healthCareProviderSpeciality = new HealthCareProviderSpeciality
            {
                HealthCareProviderId = hcp.Id,
                SpecialityId = specialityId
            };
            await _healthCareProviderSpecialityRepository.AddAsync(healthCareProviderSpeciality);
        }
        await _healthCareProviderSpecialityRepository.SaveChangesAsync();

        var providerToUpdate = _mapper.Map(updateDto, hcp);

        await _healthCareProviderRepository.UpdateAsync(providerToUpdate);
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