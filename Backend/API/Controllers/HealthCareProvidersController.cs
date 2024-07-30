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
    //[Authorize(Roles = "MedicalCenter, Patient")]
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

    [HttpPatch("update-phone-number")]
    [Authorize(Roles = "HealthCareProvider")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdatePhoneNumber([FromBody] UpdatePhoneNumberDto updatePhoneNumberDto)
    {
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }

        var response = await _healthCareProviderService.UpdatePhoneNumber(userId, updatePhoneNumberDto);
        if (!response.Success)
        {
            return NotFound();
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

