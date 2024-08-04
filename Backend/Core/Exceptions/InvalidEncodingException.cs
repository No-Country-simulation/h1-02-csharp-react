namespace Application.Exceptions;

public class InvalidEncodingException : Exception
{
    public InvalidEncodingException(string message) : base(message) { }
}