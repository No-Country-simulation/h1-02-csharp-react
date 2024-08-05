using Application.Contracts.Services;
using Application.Services;
using DTOs.Pathology;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PathologiesController : ControllerBase
{
    private readonly IPathologyService _pathologyService;

    public PathologiesController(IPathologyService pathologyService)
    {
        _pathologyService = pathologyService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<GetPathologiesDto>>> GetAllPathologies()
    {
        var response = await _pathologyService.GetAllPathologies();

        if (!response.Success)
        {
            return NotFound();
        }
        return Ok(response);
    }
}
