using Application.Contracts.Services;
using DTOs.Patient;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Utilities.Enums;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;
        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [Authorize(Roles = nameof(AccountType.HealthCareProvider))]
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult> GetPatientById(Guid id)
        {
            var result = await _patientService.GetPatientById(id);

            if (result != null)
            {
                return Ok(result);
            }
            return NotFound($"Patient with Id {id} was not found.");
        }

        [Authorize(Roles = nameof(AccountType.HealthCareProvider))]
        [Authorize(Roles = nameof(AccountType.MedicalCenter))]
        [HttpGet("GetAllPatients")]
        public async Task<ActionResult> GetAllPatients()
        {
            var result = await _patientService.GetAllPatients();

            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [HttpPut("EditPatient/{patientId}")]
        public async Task<ActionResult> EditPatient(Guid patientId, PatientUpdateDto updateRequest)
        {
            if (patientId != updateRequest.Id)
            {
                return BadRequest();
            }
            return Ok(await _patientService.UpdatePatient(patientId, updateRequest));
        }

        [HttpDelete("DeletePatient/{patientId}")]
        public async Task<ActionResult> DeletePatient(Guid patientId)
        {
            return Ok(await _patientService.DeletePatient(patientId));
        }
    }
}
