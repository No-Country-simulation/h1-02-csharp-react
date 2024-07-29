using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using DTOs;
using DTOs.Record;
using Microsoft.Extensions.Logging;

namespace Application.Services
{
    public class RecordService : IRecordService
    {
        public readonly IRecordRepository _recordRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<RecordService> _logger;

        public RecordService(IRecordRepository recordRepository, IMapper mapper, ILogger<RecordService> logger)
        {
            _recordRepository = recordRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ServiceResponse<List<RecordGetDto>>> GetAllRecordsByPatientId(Guid patientId)
        {
            var serviceResponse = new ServiceResponse<List<RecordGetDto>>();

            try
            {
                serviceResponse.Data = await _recordRepository.GetAllRecords(patientId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<RecordGetDto>> GetRecordById(Guid recordId, Guid? patientId = null)
        {
            var serviceResponse = new ServiceResponse<RecordGetDto>();

            try
            {
                serviceResponse.Data = await _recordRepository.GetRecordById(recordId, patientId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;

        }
        public async Task<ServiceResponse<bool>> AddRecords(List<RecordAddDto> addRecords)
        {
            var serviceResponse = new ServiceResponse<bool>();
            var newRecords = await _recordRepository.ConvertToRecordList(addRecords);

            try
            {
                await _recordRepository.InsertRange(newRecords);
                await _recordRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "New records added successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DeleteRecord(Guid recordId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                await _recordRepository.DeleteAsync(recordId);
                await _recordRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Record deleted successfully.";
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
