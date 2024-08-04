using Application.Contracts.GoogleCloudSpeech;
using Application.Exceptions;
using DTOs;
using DTOs.GoogleCloudSpeech;
using GoogleCloudSpeech.Settings;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Text;

namespace GoogleCloudSpeech.Services;

public class GoogleSpeechToTextService : ISpeechToTextService
{
    private readonly GoogleCloudSettings _settings;
    private readonly HttpClient _httpClient;

    public GoogleSpeechToTextService(IOptions<GoogleCloudSettings> settings, HttpClient httpClient)
    {
        _settings = settings.Value;
        _httpClient = httpClient;
    }

    private void ValidateEncoding(string encoding)
    {
        var validEncodings = new List<string> { "MP3", "FLAC", "MULAW", "AMR", "AMR_WB", "OGG_OPUS", "WEBM_OPUS", "SPEEX_WITH_HEADER_BYTE" };
        if (!validEncodings.Contains(encoding))
        {
            throw new InvalidEncodingException($"Invalid encoding: {encoding}. Valid encodings are: {string.Join(", ", validEncodings)}.");
        }
    }

    public async Task<ServiceResponse<string>> TranscribeAsync(FileAudioBase64Dto fileAudioBase64Dto)
    {
        var serviceResponse = new ServiceResponse<string>();

        try
        {
            ValidateEncoding(fileAudioBase64Dto.Encoding);

            var url = $"https://speech.googleapis.com/v1/speech:recognize?key={_settings.ApiKey}";

            var requestBody = new
            {
                config = new
                {
                    encoding = fileAudioBase64Dto.Encoding,
                    sampleRateHertz = 16000,
                    languageCode = "es-ES"
                },
                audio = new
                {
                    content = fileAudioBase64Dto.Audio // stringBase64
                }
            };

            var jsonRequestBody = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(url, content);

            if (!response.IsSuccessStatusCode)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = $"Error: {response.ReasonPhrase}";
                return serviceResponse;
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            dynamic jsonResponse = JsonConvert.DeserializeObject(responseBody);

            var transcript = jsonResponse.results[0]?.alternatives[0]?.transcript;

            serviceResponse.Data = transcript;
            serviceResponse.Success = true;
            serviceResponse.Message = "Transcript Ok";
        }
        catch (InvalidEncodingException ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = $"Encoding error: {ex.Message}";
        }
        catch (HttpRequestException ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = $"Network error: {ex.Message}";
        }
        catch (JsonException ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = $"JSON error: {ex.Message}";
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = $"Unexpected error: {ex.Message}";
        }
        return serviceResponse;
    }
}