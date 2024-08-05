using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using Domain.Entities;
using DTOs;
using DTOs.TaskItem;
using Microsoft.Extensions.Logging;
using Utilities.Enums;

namespace Application.Services
{
    public class TaskItemService : ITaskItemService
    {
        private readonly ITaskItemRepository _taskItemRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<TaskItemService> _logger;
        public TaskItemService(ITaskItemRepository taskItemRepository, IMapper mapper, ILogger<TaskItemService> logger)
        {
            _taskItemRepository = taskItemRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ServiceResponse<List<TaskItemGetDto>>> GetTasksList(Guid patientId)
        {
            var serviceResponse = new ServiceResponse<List<TaskItemGetDto>>();

            try
            {
                serviceResponse.Data = await _taskItemRepository.GetTasksList(patientId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> AddTasks(List<TaskItemAddDto> tasks, string taskDesription, Guid patientId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var newTasks = _mapper.Map<List<TaskItem>>(tasks);

                foreach (var task in newTasks)
                {

                    task.PatientId = patientId;
                    task.TaskDescription = taskDesription;
                    task.IsCompleted = false;
                }

                await _taskItemRepository.InsertRange(newTasks);
                await _taskItemRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "New tasks added successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<TaskItemGetDto>> GetTaskById(Guid taskId, Guid patientId)
        {
            var serviceResponse = new ServiceResponse<TaskItemGetDto>();
            try
            {
                serviceResponse.Data = await _taskItemRepository.GetTaskById(taskId, patientId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"{ex.Message}");
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<TaskItemGetDto>>> GetTasksListByDate(Guid patientId, DateTime date)
        {
            var serviceResponse = new ServiceResponse<List<TaskItemGetDto>>();

            try
            {
                serviceResponse.Data = await _taskItemRepository.GetTasksListByDate(patientId, date);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> EditTask(Guid taskId, Guid patientId, TaskItemUpdateDto updatedTask)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var dbTask = await _taskItemRepository.GetByIdAsync(taskId);
                if (dbTask == null || dbTask.PatientId != patientId)
                {
                    throw new Exception($"Task with Id '{taskId}' was not found.");
                }

                _mapper.Map(updatedTask, dbTask);
                await _taskItemRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Task edited successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DeleteTask(Guid taskId, Guid patientId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                if (await _taskItemRepository.DeleteTask(taskId, patientId))
                    await _taskItemRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Task deleted successfully";
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

