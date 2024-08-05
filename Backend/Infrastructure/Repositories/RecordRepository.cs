using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Record;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories
{
    public class RecordRepository : GenericRepository<Record>, IRecordRepository
    {
        private readonly IMapper _mapper;
        public RecordRepository(IMapper mapper, JustinaDbContext context) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<RecordGetDto>> GetAllRecords(Guid patientId)
        {
            var records = await _dbContext.Records
                .Where(r => r.PatientId == patientId)
                .ProjectTo<RecordGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return records;
        }

        public async Task<RecordGetDto?> GetRecordById(Guid recordId, Guid? patientId)
        {
            return await _dbContext.Records
                .Where(x => x.Id == recordId && !patientId.HasValue || patientId == x.PatientId)
                .ProjectTo<RecordGetDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Record>> ConvertToRecordList(List<RecordAddDto> newRecords)
        {
            var newRecordsList = new List<Record>();

            foreach (var record in newRecords)
            {

                var hcProviderMedicalCenterId = await _dbContext.HealthCareProviderMedicalCenter
                    .Where(x => x.MedicalCenter.CUIT == record.MedicalCenterCuit &&
                        x.HealthCareProvider.ApplicationUser.IdentificationNumber == record.HealthCareProviderIdentificationNumber)
                    .Select(x => x.Id)
                    .FirstOrDefaultAsync();

                var pathologyId = await _dbContext.Pathologies
                    .Where(p => p.Description == record.PathologyDescription)
                    .Select(p => p.Id)
                    .FirstOrDefaultAsync();

                var patientId = await _dbContext.Patients
                    .Where(p => p.ApplicationUser.IdentificationNumber == record.PatientIdentificationNumber)
                    .Select(p => p.Id)
                    .FirstOrDefaultAsync();

                var newRecord = new Record
                {
                    Title = record.Title,
                    Description = record.Description,
                    CreatedDate = record.CreatedDate,
                    PatientId = patientId,
                    PathologyId = pathologyId,
                    HealthCareProviderMedicalCenterId = hcProviderMedicalCenterId
                };

                newRecordsList.Add(newRecord);
            }

            return newRecordsList;
        }
    }
}
