using Application.Contracts.Services;
using DTOs.HealthCareProvider;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HealthCareProvidersController : ControllerBase
{
    private readonly IHealthCareProviderService _healthCareProviderService;

    public HealthCareProvidersController(IHealthCareProviderService healthCareProviderService)
    {
        _healthCareProviderService = healthCareProviderService;
    }

    [HttpGet(Name = "GetAllHealthCareProviders")]
    [Authorize(Roles = "MedicalCenter, Patient")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetAllHealthCareProviders()
    {
        var response = await _healthCareProviderService.GetAllHealthCareProviders();

        if (!response.Success)
        {
            return NotFound();
        }
        return Ok(response);
    }

    [HttpGet("profile", Name = "GetProfile")]
    [Authorize(Roles = "HealthCareProvider")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetHealthCareProviderById()
    {
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }
        var response = await _healthCareProviderService.GetHealthCareProviderByIdAsync(userId);

        if (!response.Success)
        {
            return NotFound();
        }

        return Ok(response);
    }

    [HttpGet("{cuil}")]
    [Authorize(Roles = "MedicalCenter")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetHealthCareProviderByCuil(string cuil)
    {
        var result = await _healthCareProviderService.GetHealthCareProviderByCuil(cuil);

        if (result != null)
        {
            return Ok(result);
        }
        return NotFound($"HealthCareProvider with CUIL {cuil} was not found.");
    }

    //[HttpGet("{id}")]
    //[Authorize(Roles = "MedicalCenter")]
    //[ProducesResponseType(StatusCodes.Status204NoContent)]
    //[ProducesResponseType(StatusCodes.Status401Unauthorized)]
    //[ProducesResponseType(StatusCodes.Status404NotFound)]
    //public async Task<ActionResult> GetHealthCareProviderByCuil(Guid id)
    //{
    //    var result = await _healthCareProviderService.GetHealthCareProviderByCuil(cuil);

    //    if (result != null)
    //    {
    //        return Ok(result);
    //    }
    //    return NotFound($"HealthCareProvider with CUIL {cuil} was not found.");
    //}

    [HttpPut("{id}")]
    [Authorize(Roles = "MedicalCenter")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateHealthCareProvider(Guid id, [FromBody] UpdateHealthCareProviderDto updateDto)
    {
        var response = await _healthCareProviderService.UpdateHealthCareProviderAsync(id, updateDto);
        if (!response.Success)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPatch("profile/contact-info")]
    [Authorize(Roles = "HealthCareProvider")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateContactInfo([FromBody] UpdateContactInfoDto updateContactInfoDto)
    {
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }

        var response = await _healthCareProviderService.UpdateContactInfoAsync(userId, updateContactInfoDto);
        if (!response.Success)
        {
            if (response.Data == "PasswordMismatch")
            {
                return BadRequest(new { message = response.Message });
            }

            return NotFound(new { message = response.Message });
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "MedicalCenter")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteHealthCareProvider(Guid id)
    {
        var response = await _healthCareProviderService.DeleteHealthCareProvider(id);

        if (!response.Success)
        {
            return NotFound();
        }

        return Ok(response);
    }
}

