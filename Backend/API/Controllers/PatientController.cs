using Application.Contracts.Services;
using DTOs.Patient;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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

        private async Task<Guid> GetCurrentPatient()
        {
            var userId = User.FindFirstValue("uid");
            var userGuid = new Guid(userId);

            var patientId = await _patientService.GetPatientIdByUserId(userGuid);

            return patientId.Data;
        }

        [Authorize(Roles = nameof(AccountType.Patient))]
        [HttpGet("GetPatient")]
        public async Task<ActionResult> GetPatientById()
        {
            var patientId = await GetCurrentPatient();

            var result = await _patientService.GetPatientById(patientId);

            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [Authorize(Roles = nameof(AccountType.HealthCareProvider))]
        [HttpGet("GetPatientByCuil/{cuil}")]
        public async Task<ActionResult> GetPatientByCuil(string cuil)
        {
            var result = await _patientService.GetPatientByCuil(cuil);

            if (result != null)
            {
                return Ok(result);
            }
            return NotFound($"Patient with CUIL {cuil} was not found.");
        }

        [Authorize(Roles = $"{nameof(AccountType.MedicalCenter)}, {nameof(AccountType.HealthCareProvider)}")]
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

        [Authorize(Roles = nameof(AccountType.Patient))]
        [HttpPut("EditPatient/{patientId}")]
        public async Task<ActionResult> EditPatient(Guid patientId, PatientUpdateDto updateRequest)
        {
            if (patientId != updateRequest.Id)
            {
                return BadRequest();
            }
            return Ok(await _patientService.UpdatePatient(patientId, updateRequest));
        }

        [Authorize(Roles = nameof(AccountType.Patient))]
        [HttpPut("UpdateChronicDiseases")]
        public async Task<ActionResult> UpdateChronicDiseases(PatientUpdateDiaseasesDto updateRequest)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _patientService.UpdatePatientDiseases(patientId, updateRequest));
        }

        [Authorize(Roles = nameof(AccountType.Patient))]
        [HttpPut("UpdateMedication")]
        public async Task<ActionResult> UpdateMedication(PatientUpdateDrugsDro updateRequest)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _patientService.UpdatePatientDrugs(patientId, updateRequest));
        }

        [Authorize(Roles = nameof(AccountType.Patient))]
        [HttpDelete("DeletePatient/{patientId}")]
        public async Task<ActionResult> DeletePatient(Guid patientId)
        {
            return Ok(await _patientService.DeletePatient(patientId));
        }
    }
}
