using Domain.Entities;
using DTOs.TaskItem;

namespace Application.Contracts.Persistence
{
    public interface ITaskItemRepository : IGenericRepository<TaskItem>
    {
        Task<List<TaskItemGetDto>> GetTasksList(Guid patientId);
        Task<TaskItemGetDto?> GetTaskById(Guid taskId, Guid patientId);
        Task<List<TaskItemGetDto>> GetTasksListByDate(Guid patientId, DateTime date);
        Task<bool> DeleteTask(Guid taskId, Guid patientId);
    }
}
