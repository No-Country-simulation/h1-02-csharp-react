using Application.Contracts.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MedicalCentersController : ControllerBase
{
    private readonly IMedicalCenterService _medicalCenterService;

    public MedicalCentersController(IMedicalCenterService medicalCenterService)
    {
        _medicalCenterService = medicalCenterService;
    }

    [HttpGet(Name = "GetAllMedicalCenters")]
    //[Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetAllMedicalCenters()
    {
        var response = await _medicalCenterService.GetAllMedicalCenters();

        if (!response.Success)
        {
            return NotFound();
        }
        return Ok(response);
    }

    [HttpGet("{id}", Name = "GetMedicalCenterById")]
    //[Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetMedicalCenterById(Guid id)
    {
        var response = await _medicalCenterService.GetMedicalCenterByIdAsync(id);

        if (!response.Success)
        {
            return NotFound($"Speciality with Id {id} was not found.");
        }
        return Ok(response);
    }
}
