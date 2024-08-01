using Amazon.S3.Transfer;
using Amazon.S3;
using Microsoft.Extensions.Configuration;
using Application.Contracts.AWS;
using Microsoft.AspNetCore.Http;
using DTOs;
using Amazon.Runtime;

namespace AWS.S3;

public class S3FileService : IFileService
{
    private readonly IConfiguration _configuration;
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;

    public S3FileService(IConfiguration configuration)
    {
        _configuration = configuration;
        _bucketName = _configuration["AWS:BucketName"];
        _s3Client = new AmazonS3Client(
                          _configuration["AWS:AccessKey"],
                          _configuration["AWS:SecretKey"],
                          Amazon.RegionEndpoint.SAEast1
                        );
        var awsOptions = configuration.GetAWSOptions();
        _s3Client = awsOptions.CreateServiceClient<IAmazonS3>();

    }

    public async Task<ServiceResponse<string>> UploadFileMedicalRecordAsync(IFormFile file, string fileFolder)
    {
        var serviceResponse = new ServiceResponse<string>();

        try
        {
            var fileTransferUtility = new TransferUtility(_s3Client);

            var folderKey = $"medical-tests/";

            using (var stream = file.OpenReadStream())
            {
                // Create folder in S3
                if (!string.IsNullOrEmpty(fileFolder))
                {
                    folderKey = $"medical-tests/{fileFolder}/";
                    var emptyFolderRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = new MemoryStream(new byte[0]), // empty file
                        Key = folderKey,
                        BucketName = _bucketName,
                        ContentType = "application/x-directory"
                    };

                    await fileTransferUtility.UploadAsync(emptyFolderRequest);
                }

                // upload file to the folder
                var uploadRequest = new TransferUtilityUploadRequest
                {
                    InputStream = stream,
                    Key = $"{folderKey}{file.FileName}",
                    BucketName = _bucketName,
                    ContentType = file.ContentType
                };

                await fileTransferUtility.UploadAsync(uploadRequest);
            }

            serviceResponse.Data = $"https://{_bucketName}.s3.amazonaws.com/{folderKey}{file.FileName}";
            serviceResponse.Message = "File uploaded successfully.";
        }
        catch (AmazonS3Exception ex)
        {
            serviceResponse.Data = null;
            serviceResponse.Success = false;
            serviceResponse.Message = $"Error uploading to S3: {ex.Message}";
        }
        catch (AmazonServiceException ex)
        {
            serviceResponse.Data = null;
            serviceResponse.Success = false;
            serviceResponse.Message = $"AWS service error: {ex.Message}";
        }
        catch (AmazonClientException ex)
        {
            serviceResponse.Data = null;
            serviceResponse.Success = false;
            serviceResponse.Message = $"AWS client error: {ex.Message}";
        }
        catch (IOException ex)
        {
            serviceResponse.Data = null;
            serviceResponse.Success = false;
            serviceResponse.Message = $"File I/O error: {ex.Message}";
        }
        catch (Exception ex)
        {
            serviceResponse.Data = null;
            serviceResponse.Success = false;
            serviceResponse.Message = $"An unexpected error occurred: {ex.Message}";
        }

        return serviceResponse;

    }
}
