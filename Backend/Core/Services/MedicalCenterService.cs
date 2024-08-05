using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using Domain.Entities;
using DTOs.HealthCareProvider;
using DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using DTOs.MedicalCenter;

namespace Application.Services;

public class MedicalCenterService : IMedicalCenterService
{
    private readonly IMedicalCenterRepository _medicalCenterRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<MedicalCenterService> _logger;

    public MedicalCenterService(
        IMedicalCenterRepository medicalCenterRepository,
        IMapper mapper,
        ILogger<MedicalCenterService> logger)
    {
        _medicalCenterRepository = medicalCenterRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ServiceResponse<List<GetMedicalCentersDto>>> GetAllMedicalCenters()
    {
        var serviceResponse = new ServiceResponse<List<GetMedicalCentersDto>>();

        try
        {
            var medicalCenters = await _medicalCenterRepository.GetMedicalCentersWithUserAsync();
            serviceResponse.Data = _mapper.Map<List<GetMedicalCentersDto>>(medicalCenters);
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

    public async Task<ServiceResponse<GetByIdMedicalCenterDto>> GetMedicalCenterByIdAsync(Guid id)
    {
        var serviceResponse = new ServiceResponse<GetByIdMedicalCenterDto>();

        try
        {
            var medicalCentersHealthCareProvider = await _medicalCenterRepository
                .GetByIdWithHealthCareProviderAsync(id);

            if (medicalCentersHealthCareProvider == null)
            {
                serviceResponse.Data = null;
                serviceResponse.Success = false;
                return serviceResponse;
            }

            serviceResponse.Data = _mapper.Map<GetByIdMedicalCenterDto>(medicalCentersHealthCareProvider);
            serviceResponse.Message = "List Medical Center";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex, $"{ex.Message}");
        }

        return serviceResponse;
    }

}
