using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using Domain.Entities;
using DTOs;
using DTOs.Allergy;
using Microsoft.Extensions.Logging;

namespace Application.Services
{
    public class AllergyService : IAllergyService
    {
        private readonly IAllergyRepository _allergyRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<NoteService> _logger;

        public AllergyService(IAllergyRepository allergyRepository, IMapper mapper, ILogger<NoteService> logger)
        {
            _allergyRepository = allergyRepository;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<ServiceResponse<List<AllergyGetDto>>> GetPatientAllergies(Guid patientId)
        {
            var serviceResponse = new ServiceResponse<List<AllergyGetDto>>();

            try
            {
                serviceResponse.Data = await _allergyRepository.GetPatientAllergies(patientId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> AddAllergies(List<AllergyUpdateDto> allergies, Guid patientId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var newAllergies = _mapper.Map<List<Allergy>>(allergies);

                foreach (var allergy in newAllergies)
                {

                    allergy.PatientId = patientId;
                }

                await _allergyRepository.InsertRange(newAllergies);
                await _allergyRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "New allergies added successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DeleteAllergy(Guid allergyId, Guid patientId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                if (await _allergyRepository.DeleteAllergy(allergyId, patientId))
                    await _allergyRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Allergy deleted successfully";
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
}
