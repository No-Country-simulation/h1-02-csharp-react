using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using DTOs;
using DTOs.Disease;
using Microsoft.Extensions.Logging;

namespace Application.Services
{
    public class DiseaseService : IDiseaseService
    {
        private readonly IDiseaseRepository _diseaseRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<DiseaseService> _logger;

        public DiseaseService(IDiseaseRepository diseaseRepository, IMapper mapper, ILogger<DiseaseService> logger)
        {
            _diseaseRepository = diseaseRepository;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<ServiceResponse<List<DiseaseGetDto>>> GetAllDiseases()
        {
            var serviceResponse = new ServiceResponse<List<DiseaseGetDto>>();

            try
            {
                serviceResponse.Data = await _diseaseRepository.GetAllDiseases();
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
