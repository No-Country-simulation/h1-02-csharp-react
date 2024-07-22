using Application.Contracts.Services;
using DTOs.HealthCareProvider;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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

    [HttpGet]
    [Authorize(Roles = "HealthCareProvider")]
    public async Task<IActionResult> GetHealthCareProviderById()
    {
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }
        var healthCareProviderDto = await _healthCareProviderService.GetHealthCareProviderByIdAsync(userId);
        if (healthCareProviderDto == null) return NotFound();

        return Ok(healthCareProviderDto);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "MedicalCenter")]
    public async Task<IActionResult> UpdateHealthCareProvider(Guid id, [FromBody] UpdateHealthCareProviderDto updateDto)
    {
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }

        var result = await _healthCareProviderService.UpdateHealthCareProviderAsync(id, updateDto);
        if (!result) return NotFound();

        return NoContent();
    }

    [HttpPatch("update-phone-number")]
    [Authorize(Roles = "HealthCareProvider")]
    public async Task<IActionResult> UpdatePhoneNumber([FromBody] UpdatePhoneNumberDto updatePhoneNumberDto)
    {
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }

        var result = await _healthCareProviderService.UpdatePhoneNumber(userId, updatePhoneNumberDto);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}

