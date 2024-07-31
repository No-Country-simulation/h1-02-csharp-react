using Application.Contracts.AWS;
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

    public UploadFilesController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        var serviceResponse = await _fileService.UploadFileAsync(file);

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
