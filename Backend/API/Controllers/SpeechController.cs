using Application.Contracts.GoogleCloudSpeech;
using Application.Exceptions;
using DTOs.GoogleCloudSpeech;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SpeechController : ControllerBase
{
    private readonly ISpeechToTextService _speechToTextService;

    public SpeechController(ISpeechToTextService speechToTextService)
    {
        _speechToTextService = speechToTextService;
    }

    [HttpPost("transcribe")]
    public async Task<IActionResult> TranscribeWithGoogleSpeechToText([FromBody] FileAudioBase64Dto fileAudioBase64Dto)
    {
        if (fileAudioBase64Dto == null || string.IsNullOrEmpty(fileAudioBase64Dto.Audio))
        {
            return BadRequest("Invalid request object.");
        }

        var serviceResponse = await _speechToTextService.TranscribeAsync(fileAudioBase64Dto);
        if (!serviceResponse.Success)
        {
            if (
                serviceResponse.Message.Contains("Encoding error") || 
                serviceResponse.Message.Contains("JSON error") || 
                serviceResponse.Message.Contains("Error"))
            {
                return BadRequest(serviceResponse.Message);
            }
            else if (serviceResponse.Message.Contains("Network error"))
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable, serviceResponse.Message);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, serviceResponse.Message);
            }
        }

        return Ok(serviceResponse.Data);
    }
}
