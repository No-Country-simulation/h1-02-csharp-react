namespace DTOs;

public class ServiceResponse<T>
{
    public T? Data { get; set; }
    public bool Success { get; set; } = true;
    public string Message { get; set; } = string.Empty;
    public List<string>? ValidationErrors { get; set; }

    public ServiceResponse()
    {
        Success = true;
    }

    public ServiceResponse(T? data)
    {
        Data = data;
    }

    public ServiceResponse(string message)
    {
        Success = true;
        Message = message;
    }

    public ServiceResponse(string message, bool success)
    {
        Success = success;
        Message = message;
    }

    public ServiceResponse(T? data, bool success, string message, List<string>? validationErrors)
    {
        Data = data;
        Success = success;
        Message = message;
        ValidationErrors = validationErrors;
    }
}
