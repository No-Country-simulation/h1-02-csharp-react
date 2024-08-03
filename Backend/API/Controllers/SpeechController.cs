using Application.Contracts.GoogleCloudSpeech;
using DTOs.GoogleCloudSpeech;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

    //[HttpPost("transcribe")]
    //public async Task<IActionResult> Transcribe([FromForm] IFormFile audioFile)
    //{
    //    if (audioFile == null || audioFile.Length == 0)
    //    {
    //        return BadRequest("Audio file is required.");
    //    }

    //    var filePath = Path.GetTempFileName();

    //    using (var stream = System.IO.File.Create(filePath))
    //    {
    //        await audioFile.CopyToAsync(stream);
    //    }

    //    var transcription = await _speechToTextService.TranscribeAsync(filePath);
    //    return Ok(new { Transcription = transcription });
    //}

    [HttpPost("transcribe")]
    public async Task<IActionResult> TranscribeWithGoogleSpeechToText([FromBody] FileAudioBase64Dto fileAudioBase64Dto)
    {
        if (fileAudioBase64Dto == null || string.IsNullOrEmpty(fileAudioBase64Dto.Audio))
        {
            return BadRequest("Invalid request object.");
        }

        try
        {
            var transcription = await _speechToTextService.TranscribeAsync(fileAudioBase64Dto);
            return Ok(new { transcription });
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
