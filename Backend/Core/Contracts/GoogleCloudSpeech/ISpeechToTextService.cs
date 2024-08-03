using DTOs.GoogleCloudSpeech;

namespace Application.Contracts.GoogleCloudSpeech;

public interface ISpeechToTextService
{
    //Task<string> TranscribeAsync(string audioFilePath);
    Task<string> TranscribeAsync(FileAudioBase64Dto fileAudioBase64Dto);
}