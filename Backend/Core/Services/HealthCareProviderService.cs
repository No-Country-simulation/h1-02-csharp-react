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

    public async Task<HealthCareProviderGetByIdDto> GetHealthCareProviderByIdAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        var hcp = await _healthCareProviderRepository
            .GetByConditionAsync(hp => hp.ApplicationUserId == user.Id);
        
        if (hcp == null) return null;

        var healthCareProvider = await _healthCareProviderRepository
            .GetByIdWithSpecialitiesAsync(hcp.Id);

        if (healthCareProvider == null) return null;


        var dto = _mapper.Map<HealthCareProviderGetByIdDto>(healthCareProvider);
        return dto;
    }

    public async Task<bool> UpdateHealthCareProviderAsync(string userId, HealthCareProviderUpdateDto updateDto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        user.FirstName = updateDto.FirstName;
        user.LastName = updateDto.LastName;
        user.Birthdate = updateDto.BirthDate;

        var hcp = await _healthCareProviderRepository.GetByConditionAsync(hp => hp.ApplicationUserId == user.Id);
        if (hcp == null) return false;

        // delete existing relations
        var existingSpecialities = await _healthCareProviderSpecialityRepository
            .GetAllPredicateAsync(hps => hps.HealthCareProviderId == hcp.Id);

        foreach (var speciality in existingSpecialities)
        {
            await _healthCareProviderSpecialityRepository.DeleteAsync(speciality);
            await _healthCareProviderSpecialityRepository.SaveChangesAsync();
        }

        // add new relations to specialities
        foreach (var specialityId in updateDto.SpecialityIds)
        {
            var healthCareProviderSpeciality = new HealthCareProviderSpeciality
            {
                HealthCareProviderId = hcp.Id,
                SpecialityId = specialityId
            };
            await _healthCareProviderSpecialityRepository.AddAsync(healthCareProviderSpeciality);
            await _healthCareProviderSpecialityRepository.SaveChangesAsync();
        }

        var providerToUpdate = _mapper.Map<HealthCareProvider>(hcp);

        await _healthCareProviderRepository.UpdateAsync(providerToUpdate);
        await _healthCareProviderRepository.SaveChangesAsync();
        return true;
    }
}
