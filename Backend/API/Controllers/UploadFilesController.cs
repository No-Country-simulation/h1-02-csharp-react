using Application.Contracts.AWS;
using Application.Contracts.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UploadFilesController : ControllerBase
{
    private readonly IFileService _fileService;
    private readonly IPatientService _patientService;

    public UploadFilesController(IFileService fileService, IPatientService patientService)
    {
        _fileService = fileService;
        _patientService = patientService;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status503ServiceUnavailable)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        var serviceResponse = await _fileService.UploadFileMedicalRecordAsync(file, "");

        if (!serviceResponse.Success)
        {
            if (serviceResponse.Message.Contains("AWS service error"))
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable, serviceResponse.Message);
            }
            else if (serviceResponse.Message.Contains("AWS client error"))
            {
                return BadRequest(serviceResponse.Message);
            }
            else if (serviceResponse.Message.Contains("File I/O error"))
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, serviceResponse.Message);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, serviceResponse.Message);
            }
        }

        return Ok(serviceResponse);
    }
}
