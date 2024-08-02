using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.TaskItem;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories
{
    public class TaskItemRepository : GenericRepository<TaskItem>, ITaskItemRepository
    {
        private readonly IMapper _mapper;
        public TaskItemRepository(IMapper mapper, JustinaDbContext context) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<TaskItemGetDto>> GetTasksList(Guid patientId)
        {
            return await _dbContext.TaskItems
                .Where(t => t.PatientId == patientId)
                .ProjectTo<TaskItemGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<List<TaskItemGetDto>> GetTasksListByDate(Guid patientId, DateTime date)
        {
            return await _dbContext.TaskItems
                .Where(t => t.PatientId == patientId && t.TaskDate == date.Date)
                .ProjectTo<TaskItemGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }
        public async Task<TaskItemGetDto?> GetTaskById(Guid taskId, Guid patientId)
        {
            return await _dbContext.TaskItems
                .Where(x => x.Id == taskId && x.PatientId == patientId)
                .ProjectTo<TaskItemGetDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }
        public async Task<bool> DeleteTask(Guid taskId, Guid patientId)
        {
            var dbTask = await _dbContext.TaskItems.FirstOrDefaultAsync(t => t.Id == taskId && t.PatientId == patientId);
            var result = DeleteAsync(dbTask);

            return result;
        }
    }
}
