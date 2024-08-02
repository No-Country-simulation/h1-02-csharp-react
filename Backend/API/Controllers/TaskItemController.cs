using Application.Contracts.Services;
using DTOs;
using DTOs.TaskItem;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Utilities.Enums;

namespace API.Controllers
{
    [Authorize(Roles = nameof(AccountType.Patient))]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemController : ControllerBase
    {
        private readonly ITaskItemService _taskItemService;
        private readonly IPatientService _patientService;

        public TaskItemController(ITaskItemService taskItemService, IPatientService patientService)
        {
            _taskItemService = taskItemService;
            _patientService = patientService;
        }

        private async Task<Guid> GetCurrentPatient()
        {
            var userId = User.FindFirstValue("uid");
            var userGuid = new Guid(userId);

            var patientId = await _patientService.GetPatientIdByUserId(userGuid);

            return patientId.Data;
        }

        [HttpGet("GetTasksList")]
        public async Task<ActionResult<ServiceResponse<List<TaskItemGetDto>>>> GetTasksList()
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _taskItemService.GetTasksList(patientId));
        }

        [HttpGet("GetTasksListByDate")]
        public async Task<ActionResult<ServiceResponse<List<TaskItemGetDto>>>> GetTasksListByDate(DateTime date)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _taskItemService.GetTasksListByDate(patientId, date));
        }

        [HttpPost("AddTasks")]
        public async Task<ActionResult<ServiceResponse<bool>>> AddTasks(List<TaskItemAddDto> tasks, string taskDescription)
        {
            var patientId = await GetCurrentPatient();

            foreach (var task in tasks)
            {
                if (!Enum.IsDefined(typeof(TaskCategory), task.Category))
                {
                    return BadRequest();
                }
            }

            return Ok(await _taskItemService.AddTasks(tasks, taskDescription, patientId));
        }

        [HttpGet("GetTaskById/{taskId}")]
        public async Task<ActionResult> GetTaskById(Guid taskId)
        {
            var patientId = await GetCurrentPatient();

            var result = await _taskItemService.GetTaskById(taskId, patientId);

            if (result != null)
            {
                return Ok(result);
            }
            return NotFound($"Task with Id {taskId} was not found.");
        }

        [HttpPatch("CompleteTask/{taskId}")]
        public async Task<ActionResult<ServiceResponse<bool>>> EditTask(Guid taskId, TaskItemUpdateDto updatedTask)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _taskItemService.EditTask(taskId, patientId, updatedTask));
        }

        [HttpDelete("DeleteTask/{taskId}")]
        public async Task<ActionResult<bool>> DeleteTask(Guid taskId)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _taskItemService.DeleteTask(taskId, patientId));
        }
    }

}
