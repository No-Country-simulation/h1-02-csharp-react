using DTOs;
using Microsoft.AspNetCore.Http;

namespace Application.Contracts.AWS;

public interface IFileService
{
    Task<ServiceResponse<string>> UploadFileMedicalRecordAsync(IFormFile file, string fileFolder);
}