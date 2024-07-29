using DTOs;
using DTOs.Record;

namespace Application.Contracts.Services
{
    public interface IRecordService
    {
        Task<ServiceResponse<List<RecordGetDto>>> GetAllRecordsByPatientId(Guid patientId);
        Task<ServiceResponse<RecordGetDto>> GetRecordById(Guid recordId, Guid? patientId = null);
        Task<ServiceResponse<bool>> AddRecords(List<RecordAddDto> addRecords);
        Task<ServiceResponse<bool>> DeleteRecord(Guid recordId);
    }
}
