using DTOs;
using Microsoft.AspNetCore.Http;

namespace Application.Contracts.AWS;

public interface IFileService
{
    Task<ServiceResponse<string>> UploadFileAsync(IFormFile file);
}