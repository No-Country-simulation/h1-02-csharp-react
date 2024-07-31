using Application.Contracts.AWS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        var result = await _fileService.UploadFileAsync(file);
        return Ok(result);
    }

}
