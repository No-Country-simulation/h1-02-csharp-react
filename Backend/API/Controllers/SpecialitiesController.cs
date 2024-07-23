using Application.Contracts.Services;
using DTOs;
using DTOs.Speciality;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SpecialitiesController : ControllerBase
{
    private readonly ISpecialityService _specialityService;

    public SpecialitiesController(ISpecialityService specialityService)
    {
        _specialityService = specialityService;
    }

    [HttpGet()]
    //[Authorize(Roles = "Patient")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetAllSpecialities()
    {
        var response = await _specialityService.GetAllSpecialities();

        if (!response.Success)
        {
            return NotFound();
        }
        return Ok(response);
    }

    [HttpGet("{id}")]
    //[Authorize(Roles = "Patient")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetSpecialityById(Guid id)
    {
        var response = await _specialityService.GetSpecialityById(id);

        if (!response.Success)
        {
            return NotFound($"Speciality with Id {id} was not found.");
        }
        return Ok(response);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> EditSpeciality(Guid id, UpdateSpecialityDto updateRequest)
    {
        var response = await _specialityService.UpdateSpeciality(id, updateRequest);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpPost]
    //[Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ServiceResponse<bool>>> AddSpeciality(AddSpecialityDto newSpeciality)
    {
        var response = await _specialityService.AddSpecialityAsync(newSpeciality);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
}