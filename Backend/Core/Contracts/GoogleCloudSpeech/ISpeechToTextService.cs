using DTOs;
using DTOs.GoogleCloudSpeech;

namespace Application.Contracts.GoogleCloudSpeech;

public interface ISpeechToTextService
{
    Task<ServiceResponse<string>> TranscribeAsync(FileAudioBase64Dto fileAudioBase64Dto);
}