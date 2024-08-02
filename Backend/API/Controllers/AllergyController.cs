using Application.Contracts.Services;
using DTOs;
using DTOs.Allergy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Utilities.Enums;

namespace API.Controllers
{
    [Authorize(Roles = nameof(AccountType.Patient))]
    [Route("api/[controller]")]
    [ApiController]
    public class AllergyController : ControllerBase
    {
        private readonly IAllergyService _allergyService;
        private readonly IPatientService _patientService;

        public AllergyController(IAllergyService allergyService, IPatientService patientService)
        {
            _allergyService = allergyService;
            _patientService = patientService;
        }

        private async Task<Guid> GetCurrentPatient()
        {
            var userId = User.FindFirstValue("uid");
            var userGuid = new Guid(userId);

            var patientId = await _patientService.GetPatientIdByUserId(userGuid);

            return patientId.Data;
        }

        [HttpGet("GetPatientAllergies")]
        public async Task<ActionResult> GetPatientAllergies()
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _allergyService.GetPatientAllergies(patientId));
        }

        [HttpPost("AddAllergies")]
        public async Task<ActionResult> AddAllergies(List<AllergyUpdateDto> allergies)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _allergyService.AddAllergies(allergies, patientId));
        }

        [HttpDelete("DeleteAllergy/{allergyId}")]
        public async Task<ActionResult> DeleteAllergy(Guid allergyId)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _allergyService.DeleteAllergy(allergyId, patientId));
        }
    }
}
