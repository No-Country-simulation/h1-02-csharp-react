using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using DTOs;
using DTOs.Drug;
using Microsoft.Extensions.Logging;

namespace Application.Services
{
    public class DrugService : IDrugService
    {
        private readonly IDrugRepository _drugRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<DrugService> _logger;

        public DrugService(IDrugRepository drugRepository, IMapper mapper, ILogger<DrugService> logger)
        {
            _drugRepository = drugRepository;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<ServiceResponse<List<DrugGetDto>>> GetAllDrugs()
        {
            var serviceResponse = new ServiceResponse<List<DrugGetDto>>();

            try
            {
                serviceResponse.Data = await _drugRepository.GetAllDrugs();
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

