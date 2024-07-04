using Core.Models.Authentication;

namespace Core.Contracts.Services;

public interface IAuthenticationService
{
    Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request);
    Task<RegistrationResponse> RegisterAsync(RegistrationRequest request);
}
