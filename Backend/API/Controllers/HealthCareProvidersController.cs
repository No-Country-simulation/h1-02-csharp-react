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

    [HttpPut]
    [Authorize(Roles = "HealthCareProvider")]
    public async Task<IActionResult> UpdateHealthCareProvider(HealthCareProviderUpdateDto updateDto)
    {
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }
        //var id = new Guid(userId);
        var result = await _healthCareProviderService.UpdateHealthCareProviderAsync(userId, updateDto);
        if (!result) return NotFound();

        return NoContent();
    }
}
