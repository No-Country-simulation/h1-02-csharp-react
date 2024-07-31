using Microsoft.AspNetCore.Http;

namespace Application.Contracts.AWS;

public interface IFileService
{
    Task<string> UploadFileAsync(IFormFile file);
}