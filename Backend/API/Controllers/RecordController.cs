using Application.Contracts.Services;
using DTOs.Record;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Utilities.Enums;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly IRecordService _recordService;
        private readonly IPatientService _patientService;

        public RecordController(IRecordService recordService, IPatientService patientService)
        {
            _recordService = recordService;
            _patientService = patientService;
        }

        [Authorize(Roles = nameof(AccountType.HealthCareProvider))]
        [HttpGet("GetAllRecords/{patientId}")]
        public async Task<ActionResult> GetAllRecordsByPatientId(Guid patientId)
        {
            var result = await _recordService.GetAllRecordsByPatientId(patientId);

            if (result != null)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [Authorize(Roles = nameof(AccountType.Patient))]
        [HttpGet("GetMyRecords")]
        public async Task<ActionResult> GetMyRecords()
        {
            var userId = User.FindFirstValue("uid");
            var userGuid = new Guid(userId);

            var patientIdResponse = await _patientService.GetPatientIdByUserId(userGuid);

            var result = await _recordService.GetAllRecordsByPatientId(patientIdResponse.Data);

            if (result != null) 
            {
                return Ok(result);
            }

            return NotFound();
        }

        [Authorize(Roles = nameof(AccountType.Patient))]
        [HttpGet("GetMyRecordById/{recordId}")]
        public async Task<ActionResult> GetMyRecordById(Guid recordId)
        {
            var userId = User.FindFirstValue("uid");
            var userGuid = new Guid(userId);

            var patientIdResponse = await _patientService.GetPatientIdByUserId(userGuid);

            var result = await _recordService.GetRecordById(recordId, patientIdResponse.Data);

            if (result != null)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [Authorize(Roles = nameof(AccountType.HealthCareProvider))]
        [HttpGet]
        public async Task<ActionResult> GetRecordById(Guid recordId)
        {
            var result = await _recordService.GetRecordById(recordId);

            if (result != null)
            {
                return Ok(result);
            }

            return NotFound();
        }

        [Authorize(Roles = nameof(AccountType.MedicalCenter))]
        [HttpPost("AddRecords")]
        public async Task<ActionResult> AddRecords(List<RecordAddDto> newRecords)
        {
            return Ok(await _recordService.AddRecords(newRecords));
        }

        //TODO: Who can delete a record?

        [Authorize(Roles = nameof(AccountType.Admin))]
        [HttpDelete("DeleteRecord/{recordId}")]
        public async Task<ActionResult> DeleteRecord(Guid recordId)
        {
            return Ok(await _recordService.DeleteRecord(recordId));
        }
    }
}
