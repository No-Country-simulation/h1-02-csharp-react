using Application.Contracts.Services;
using DTOs.Patient;
using Microsoft.AspNetCore.Mvc;

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

        private Guid GetCurrentPatientId()
        {
            var claim = HttpContext.User.Claims.Where(p => p.Type == "patientId").FirstOrDefault();
            return new Guid(claim.Value);
        }

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
    }
}
