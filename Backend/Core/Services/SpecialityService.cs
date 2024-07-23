using Application.Contracts.Persistence;
using Application.Contracts.Services;
using Application.Validators.Speciality;
using AutoMapper;
using Domain.Entities;
using DTOs;
using DTOs.Speciality;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class SpecialityService : ISpecialityService
{
    private readonly ISpecialityRepository _specialityRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<PatientService> _logger;

    public SpecialityService(ISpecialityRepository specialityRepository,
        IMapper mapper,
        ILogger<PatientService> logger)
    {
        _specialityRepository = specialityRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ServiceResponse<GetSpecialitiesDto>> AddSpecialityAsync(AddSpecialityDto specialityDto)
    {
        var serviceResponse = new ServiceResponse<GetSpecialitiesDto>();

        var validator = new AddSpecialityValidator();
        var validationResult = await validator.ValidateAsync(specialityDto);
        try
        {
            if (validationResult.Errors.Count > 0)
            {
                serviceResponse.Success = false;
                serviceResponse.ValidationErrors = new List<string>();
                foreach (var error in validationResult.Errors)
                {
                    serviceResponse.ValidationErrors.Add(error.ErrorMessage);
                }
            }
            if (serviceResponse.Success)
            {
                var newSpeciality = _mapper.Map<Speciality>(specialityDto);

                var speciality = await _specialityRepository.AddAsync(newSpeciality);
                await _specialityRepository.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetSpecialitiesDto>(speciality);
                serviceResponse.Message = "Speciality added successfully";
            }
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, ex.Message);
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetSpecialitiesDto>>> GetAllSpecialities()
    {
        var serviceResponse = new ServiceResponse<List<GetSpecialitiesDto>>();

        try
        {
            var specialities = await _specialityRepository.GetAllAsync();
            serviceResponse.Data = _mapper.Map<List<GetSpecialitiesDto>>(specialities);
            serviceResponse.Message = "Get Specialities List";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex.Message);
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<GetSpecialityDto>> GetSpecialityById(Guid id)
    {
        var serviceResponse = new ServiceResponse<GetSpecialityDto>();
        try
        {
            var speciality = await _specialityRepository.GetByIdWithHealthCareProviderAsync(id);

            serviceResponse.Data = _mapper.Map<GetSpecialityDto>(speciality);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"{ex.Message}");
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<bool>> UpdateSpeciality(Guid id, UpdateSpecialityDto updateRequest)
    {
        var serviceResponse = new ServiceResponse<bool>();

        try
        {
            var speciality = await _specialityRepository.GetByIdAsync(id);

            if (speciality == null)
            {
                throw new Exception($"Speciality with Id '{id}' was not found.");
            }

            _mapper.Map(updateRequest, speciality);

            await _specialityRepository.SaveChangesAsync();

            serviceResponse.Data = true;
            serviceResponse.Message = "Patient updated successfully.";
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
