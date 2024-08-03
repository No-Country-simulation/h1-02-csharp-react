using Application.Contracts.GoogleCloudSpeech;
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

    public async Task<string> TranscribeAsync(FileAudioBase64Dto fileAudioBase64Dto)
    {
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
        response.EnsureSuccessStatusCode();

        var responseBody = await response.Content.ReadAsStringAsync();
        dynamic jsonResponse = JsonConvert.DeserializeObject(responseBody);

        var transcript = jsonResponse.results[0]?.alternatives[0]?.transcript;
        return transcript;
    }

    //public async Task<string> TranscribeAsync(string audioFilePath)
    //{
    //    var speech = new SpeechClientBuilder
    //    {
    //        ApiKey = _settings.ApiKey
    //    }.Build();

    //    var response = await speech.RecognizeAsync(new RecognitionConfig()
    //    {
    //        Encoding = RecognitionConfig.Types.AudioEncoding.Linear16,
    //        SampleRateHertz = 16000,
    //        LanguageCode = "en-ES"
    //    }, RecognitionAudio.FromFile(audioFilePath));

    //    return response.Results
    //        .SelectMany(result => result.Alternatives)
    //        .Select(alternative => alternative.Transcript)
    //        .FirstOrDefault();
    //}
}