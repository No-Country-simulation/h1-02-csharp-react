using Application.Contracts.Services;
using DTOs.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AccountController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("authenticate")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<AuthenticationResponse>> AuthenticateAsync(AuthenticationRequest request)
    {
        try
        {
            var response = await _authenticationService.AuthenticateAsync(request);
            if (response == null)
            {
                return Unauthorized(new { Message = "Authentication failed" });
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            //_logger.LogError(ex, "Error during authentication");
            return StatusCode(500, new { Message = "An error occurred while processing your request" });
        }
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<RegistrationResponse>> RegisterAsync(RegistrationRequest request)
    {
        return Ok(await _authenticationService.RegisterAsync(request));
    }

    [HttpGet("me")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult<AuthenticatedUserReponse>> GetCurrentUser()
    {
        //var userId = User.FindFirst(ClaimTypes.Name)?.Value;
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }

        var user = await _authenticationService.FindByIdAsync(userId);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }
}
