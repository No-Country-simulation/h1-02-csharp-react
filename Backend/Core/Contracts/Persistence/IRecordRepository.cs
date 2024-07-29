using Domain.Entities;
using DTOs.Record;

namespace Application.Contracts.Persistence
{
    public interface IRecordRepository : IGenericRepository<Record>
    {
        Task<List<RecordGetDto>> GetAllRecords(Guid patientId);
        Task<List<Record>> ConvertToRecordList(List<RecordAddDto> newRecords);
        Task<RecordGetDto?> GetRecordById(Guid recordId, Guid? patientId);
    }
}
