﻿using DTOs;
using DTOs.Authentication;

namespace Application.Contracts.Services;

public interface IAuthenticationService
{
    Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request);
    Task<RegistrationResponse> RegisterAsync(RegistrationRequest request);
    Task<AuthenticatedUserReponse> FindByIdAsync(string userId);
    Task<RegistrationResponse> RegisterMedicalCenterAsync(RegistrationMedicalCenterRequest request);
    Task<ServiceResponse<string>> RegisterHealthCareProviderAsync(Guid medicalCenterId, IEnumerable<RegistrationHealthCareProviderRequest> request);
}
