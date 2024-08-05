using Application.Contracts.Services;
using Application.Exceptions;
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
            return Ok(response);
        }
        catch (UserNotFoundException ex)
        {
            //_logger.LogError(ex, "User not found");
            return NotFound(new { Message = ex.Message });
        }
        catch (InvalidCredentialsException ex)
        {
            //_logger.LogError(ex, "Invalid credentials");
            return Unauthorized(new { Message = ex.Message });
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

    [HttpPost("register-medical-center")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<RegistrationResponse>> RegisterMedicalCenterAsync(RegistrationMedicalCenterRequest request)
    {
        return Ok(await _authenticationService.RegisterMedicalCenterAsync(request));
    }

    [HttpPost("register-health-care-provider")]
    [Authorize(Roles = "MedicalCenter")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<RegistrationResponse>> RegisterHealthCareProviderAsync(List<RegistrationHealthCareProviderRequest> request)
    {
        var userId = User.FindFirstValue("uid");

        if (userId == null)
        {
            return Unauthorized();
        }
        var medicalCenterId = new Guid(userId);
        var response = await _authenticationService.RegisterHealthCareProviderAsync(medicalCenterId, request);
        if (response.Success)
        {
            return Created();
        }
        else
        {
            return BadRequest(new { Message = response.Message, Errors = response.ValidationErrors });
        }
    }

    [HttpGet("me")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<AuthenticatedUserReponse>> GetCurrentUser()
    {
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
