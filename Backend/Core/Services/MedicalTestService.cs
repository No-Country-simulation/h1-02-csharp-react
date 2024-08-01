using Application.Contracts.Persistence;
using Application.Contracts.Services;
using Application.Validators.MedicalTest;
using AutoMapper;
using Domain.Entities;
using DTOs;
using DTOs.MedicalTest;
using DTOs.Record;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class MedicalTestService : IMedicalTestService
{
    private readonly IMedicalTestRepository _medicalTestRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<PatientService> _logger;

    public MedicalTestService(
        IMedicalTestRepository medicalTestRepository,
        IMapper mapper,
        ILogger<PatientService> logger)
    {
        _medicalTestRepository = medicalTestRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ServiceResponse<GetMedicalTestDto>> AddMedicalTestAsync(CreateMedicalTestDto medicalTestDto)
    {
        var serviceResponse = new ServiceResponse<GetMedicalTestDto>();

        var validator = new AddMedicalTestValidator();
        var validationResult = await validator.ValidateAsync(medicalTestDto);
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
                MedicalTest newMedicalTest;
                try
                {
                    newMedicalTest = _mapper.Map<MedicalTest>(medicalTestDto);
                }
                catch (AutoMapperMappingException ex)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Error mapping MedicalTestDto to MedicalTest.";
                    _logger.LogError(ex, ex.Message);
                    return serviceResponse;
                }

                try
                {
                    var medicalTest = await _medicalTestRepository.AddAsync(newMedicalTest);
                    await _medicalTestRepository.SaveChangesAsync();

                    serviceResponse.Data = _mapper.Map<GetMedicalTestDto>(medicalTest);
                    serviceResponse.Message = "Medical Tests added successfully";
                }
                catch (Exception ex)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "An unexpected error occurred.";
                    _logger.LogError(ex, ex.Message);
                }
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

    public async Task<ServiceResponse<List<GetMedicalTestDto>>> GetAllMedicalTests()
    {
        var serviceResponse = new ServiceResponse<List<GetMedicalTestDto>>();
        try
        {
            var medicalTest = await _medicalTestRepository.GetAllAsync();

            var medicalTestDto = _mapper.Map<List<GetMedicalTestDto>>(medicalTest);
            serviceResponse.Data = medicalTestDto;
            serviceResponse.Message = "Medical Tests List";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = "An unexpected error occurred.";
            _logger.LogError(ex, ex.Message);
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetMedicalTestDto>>> GetMedicalTestsByPatientId(Guid patientId)
    {
        var serviceResponse = new ServiceResponse<List<GetMedicalTestDto>>();

        try
        {
            serviceResponse.Data = await _medicalTestRepository.GetAllMedicalTestsByPatientId(patientId);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex.Message);
        }

        return serviceResponse;
    }
}
