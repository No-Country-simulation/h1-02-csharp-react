﻿using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using Domain.Entities;
using DTOs;
using DTOs.Patient;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace Application.Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IDiseaseRepository _diseaseRepository;
        private readonly IDrugRepository _drugRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<PatientService> _logger;

        public PatientService(IPatientRepository patientRepository, IDiseaseRepository diseaseRepository, IDrugRepository drugRepository, IMapper mapper, ILogger<PatientService> logger)
        {
            _patientRepository = patientRepository;
            _diseaseRepository = diseaseRepository;
            _drugRepository = drugRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ServiceResponse<List<PatientGetDto>>> GetAllPatients()
        {
            var serviceResponse = new ServiceResponse<List<PatientGetDto>>();

            try
            {
                serviceResponse.Data = await _patientRepository.GetAllPatients();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<PatientGetDto>> GetPatientById(Guid id)
        {
            var serviceResponse = new ServiceResponse<PatientGetDto>();
            try
            {
                serviceResponse.Data = await _patientRepository.GetPatientById(id);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"{ex.Message}");
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<PatientGetDto>> GetPatientByCuil(string cuil)
        {
            var serviceResponse = new ServiceResponse<PatientGetDto>();
            try
            {
                serviceResponse.Data = await _patientRepository.GetPatientByCuil(cuil);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"{ex.Message}");
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<Guid>> GetPatientIdByUserId(Guid userId)
        {
            var serviceResponse = new ServiceResponse<Guid>();

            try
            {
                serviceResponse.Data = await _patientRepository.GetPatientIdByUserId(userId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> UpdatePatient(Guid patientId, PatientUpdateDto updateRequest)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var dbPatient = await _patientRepository.GetPatientWithRelationships(patientId);

                if (dbPatient == null)
                {
                    throw new Exception($"Patient with Id '{patientId}' was not found.");
                }

                _mapper.Map(updateRequest, dbPatient);

                await _patientRepository.SaveChangesAsync();

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

        public async Task<ServiceResponse<bool>> UpdatePatientDiseases(Guid patientId, PatientUpdateDiaseasesDto updateRequest)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var dbPatient = await _patientRepository.GetPatientWithRelationships(patientId);

                if (dbPatient == null)
                {
                    throw new Exception($"Patient with Id '{patientId}' was not found.");
                }

                dbPatient.Diseases = await _diseaseRepository.GetDiseasesByIds(updateRequest.DiseaseIds);

                await _patientRepository.SaveChangesAsync();

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

        public async Task<ServiceResponse<bool>> UpdatePatientDrugs(Guid patientId, PatientUpdateDrugsDro updateRequest)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var dbPatient = await _patientRepository.GetPatientWithRelationships(patientId);

                if (dbPatient == null)
                {
                    throw new Exception($"Patient with Id '{patientId}' was not found.");
                }

                dbPatient.Drugs = await _drugRepository.GetDrugsByIds(updateRequest.DrugIds);

                await _patientRepository.SaveChangesAsync();

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

        public async Task<ServiceResponse<bool>> DeletePatient(Guid patientId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                await _patientRepository.DeleteAsync(patientId);
                await _patientRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Patient deleted successfully.";
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
}
