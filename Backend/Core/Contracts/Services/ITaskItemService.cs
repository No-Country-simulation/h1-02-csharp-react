using DTOs.TaskItem;
using DTOs;

namespace Application.Contracts.Services
{
    public interface ITaskItemService
    {
        Task<ServiceResponse<List<TaskItemGetDto>>> GetTasksList(Guid patientId);
        Task<ServiceResponse<TaskItemGetDto>> GetTaskById(Guid taskId, Guid patientId);
        Task<ServiceResponse<List<TaskItemGetDto>>> GetTasksListByDate(Guid patientId, DateTime date);
        Task<ServiceResponse<bool>> EditTask(Guid taskId, Guid patientId, TaskItemUpdateDto updatedTask);
        Task<ServiceResponse<bool>> DeleteTask(Guid taskId, Guid patientId);
        Task<ServiceResponse<bool>> AddTasks(List<TaskItemAddDto> tasks, string taskDesription, Guid patientId);
    }
}
