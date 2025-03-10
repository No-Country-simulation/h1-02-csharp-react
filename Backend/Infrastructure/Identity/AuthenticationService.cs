﻿using Application.Contracts.Persistence;
using Application.Contracts.Services;
using Application.Exceptions;
using Application.Models.Authentication;
using AutoMapper;
using Azure;
using Domain.Entities;
using DTOs;
using DTOs.Authentication;
using DTOs.HealthCareProvider;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Utilities.Enums;
using Utilities.Enums.ExtensionMethods;

namespace Persistence.Identity;

public class AuthenticationService : IAuthenticationService
{
    public readonly UserManager<ApplicationUser> _userManager;
    public readonly SignInManager<ApplicationUser> _signInManager;
    public readonly JwtSettings _jwtSettings;
    private readonly IHealthCareProviderRepository _healthCareProviderRepository;
    private readonly ISpecialityRepository _specialityRepository;
    private readonly IPatientRepository _patientRepository;
    private readonly IMedicalCenterRepository _medicalCenterRepository;
    private readonly IMapper _mapper;


    public AuthenticationService(
        UserManager<ApplicationUser> userManager,
        IOptions<JwtSettings> jwtSettings,
        SignInManager<ApplicationUser> signInManager,
        IHealthCareProviderRepository healthCareProviderRepository,
        ISpecialityRepository specialityRepository,
        IPatientRepository pacientRepository,
        IMedicalCenterRepository medicalCenterRepository,
        IMapper mapper)
    {
        _userManager = userManager;
        _jwtSettings = jwtSettings.Value;
        _signInManager = signInManager;
        _healthCareProviderRepository = healthCareProviderRepository;
        _specialityRepository = specialityRepository;
        _patientRepository = pacientRepository;
        _medicalCenterRepository = medicalCenterRepository;
        _mapper = mapper;
    }

    public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
    {
        var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, false, lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            throw new InvalidCredentialsException();
        }

        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
        {
            throw new UserNotFoundException(request.Email);
        }

        JwtSecurityToken jwtSecurityToken = await GenerateToken(user);

        AuthenticationResponse response = new AuthenticationResponse
        {
            Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
        };

        return response;
    }

    public async Task<RegistrationResponse> RegisterAsync(RegistrationRequest request)
    {
        try
        {
            var existingEmail = await _userManager.FindByEmailAsync(request.Email);

            if (existingEmail != null)
            {
                throw new Exception($"Email '{request.Email}' already exists");
            }

            var user = new ApplicationUser
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                UserName = request.Email,
                AccountType = request.AccountType,
                EmailConfirmed = true, // Modify email confirmation
                IdentificationType = request.IdentificationType,
                IdentificationNumber = request.IdentificationNumber,
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new Exception($"{string.Join(", ", result.Errors.Select(e => e.Description))}");
            }

            await AddUserRole(user, request);

            try
            {
                switch (request.AccountType)
                {
                    case AccountType.HealthCareProvider:
                        //await AddHealthCareProvider(user, request);
                        break;
                    case AccountType.Patient:
                        await AddPatient(user, request);
                        break;
                    default:
                        throw new NotImplementedException();
                }
            }
            catch (Exception ex)
            {
                // Handle exception related to addition
                await _userManager.DeleteAsync(user);
                throw new Exception($"Error adding {request.AccountType}: {ex.Message}");
            }

            return new RegistrationResponse() { UserId = user.Id };
        }

        catch (Exception ex)
        {
            // Log exception
            //_logger.LogError(ex, "Error during registration");

            // Rethrow or handle the exception as needed
            throw;
        }
    }

    public async Task<RegistrationResponse> RegisterMedicalCenterAsync(RegistrationMedicalCenterRequest request)
    {
        var user = await CreateUserCenterAsync(request);

        try
        {
            var roleResult = await _userManager.AddToRoleAsync(user, "MedicalCenter");

            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);
                throw new Exception($"Error assigning role: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
            }
            await AddMedicalCenter(user, request);
        }
        catch (Exception ex)
        {
            // Handle exception related to addition
            await _userManager.DeleteAsync(user);
            throw new Exception($"Error adding {ex.Message}");
        }

        return new RegistrationResponse() { UserId = user.Id };
    }

    public async Task<ServiceResponse<string>> RegisterHealthCareProviderAsync(Guid medicalCenterId, IEnumerable<RegistrationHealthCareProviderRequest> request)
    {
        var serviceResponse = new ServiceResponse<string>();

        var healthCareProviders = new List<HealthCareProvider>();
        try
        {
            foreach (var healthCareProviderDto in request)
            {
                try
                {
                    var user = await CreateUserAsync(healthCareProviderDto);

                    var roleResult = await _userManager.AddToRoleAsync(user, "HealthCareProvider");

                    if (!roleResult.Succeeded)
                    {
                        await _userManager.DeleteAsync(user);
                        throw new RoleAssignmentException($"Error assigning role: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                    }

                    var healthCareProvider = await AddHealthCareProvider(medicalCenterId, user, healthCareProviderDto);
                    healthCareProviders.Add(healthCareProvider);
                }
                catch (UserCreationException ucex)
                {
                    serviceResponse.ValidationErrors ??= new List<string>();
                    serviceResponse.ValidationErrors.Add(ucex.Message);
                }
                catch (RoleAssignmentException raex)
                {
                    serviceResponse.ValidationErrors ??= new List<string>();
                    serviceResponse.ValidationErrors.Add(raex.Message);
                }
                //var user = await CreateUserAsync(healthCareProviderDto);

                //var roleResult = await _userManager.AddToRoleAsync(user, "HealthCareProvider");

                //if (!roleResult.Succeeded)
                //{
                //    await _userManager.DeleteAsync(user);
                //    throw new RoleAssignmentException($"Error assigning role: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                //}

                //var healthCareProvider = await AddHealthCareProvider(medicalCenterId, user, healthCareProviderDto);

                //healthCareProviders.Add(healthCareProvider);
            }

            if (serviceResponse.ValidationErrors == null || serviceResponse.ValidationErrors.Count == 0)
            {
                await _healthCareProviderRepository.AddRangeAsync(healthCareProviders);
                await _healthCareProviderRepository.SaveChangesAsync();
                serviceResponse.Message = "Health care providers registered successfully.";
            }
            else
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Some health care providers could not be registered.";
            }
            //await _healthCareProviderRepository.AddRangeAsync(healthCareProviders);

            //await _healthCareProviderRepository.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = $"Unexpected error: {ex.Message}";
        }
        return serviceResponse;
    }

    private async Task<ApplicationUser> CreateUserAsync(RegistrationUserRequest request)
    {
        var existingEmail = await _userManager.FindByEmailAsync(request.Email);

        if (existingEmail != null)
        {
            throw new UserCreationException($"Email '{request.Email}' already exists");
        }

        var user = _mapper.Map<ApplicationUser>(request);

        try
        {
            var result = await _userManager.CreateAsync(user, request.Password);
            
            if (!result.Succeeded)
            {
                throw new UserCreationException($"{string.Join(", ", result.Errors.Select(e => e.Description))}");
            }

        }
        catch (Exception ex)
        {
            // Handle exception related to addition
            await _userManager.DeleteAsync(user);
            throw new UserCreationException($"Error adding user: {ex.Message}");
        }
        return user;
    }

    private async Task<ApplicationUser> CreateUserCenterAsync(RegistrationUserCentersRequest request)
    {
        var existingEmail = await _userManager.FindByEmailAsync(request.Email);

        if (existingEmail != null)
        {
            throw new UserCreationException($"Email '{request.Email}' already exists");
        }
        var user = _mapper.Map<ApplicationUser>(request);

        try
        {
            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
            {
                throw new UserCreationException($"{string.Join(", ", result.Errors.Select(e => e.Description))}");
            }
        }
        catch (Exception ex)
        {
            // Handle exception related to addition
            await _userManager.DeleteAsync(user);
            throw new UserCreationException($"Error adding user: {ex.Message}");
        }
        return user;
    }

    private async Task<JwtSecurityToken> GenerateToken(ApplicationUser user)
    {
        var userClaims = await _userManager.GetClaimsAsync(user);
        var roles = await _userManager.GetRolesAsync(user);

        var roleClaims = new List<Claim>();

        for (int i = 0; i < roles.Count; i++)
        {
            roleClaims.Add(new Claim("roles", roles[i]));
        }

        var claims = new[]
        {
            new Claim("uid", user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Name, user.FirstName),
            new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email)
        }
        .Union(userClaims)
        .Union(roleClaims);

        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

        var jwtSecurityToken = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
            signingCredentials: signingCredentials);

        return jwtSecurityToken;

    }

    private async Task<bool> AddUserRole(ApplicationUser user, RegistrationRequest request)
    {
        var roleResult = await _userManager.AddToRoleAsync(user, request.AccountType.ToString());

        if (!roleResult.Succeeded)
        {
            await _userManager.DeleteAsync(user);
            throw new Exception($"Error assigning role: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
        }

        return true;
    }

    private async Task<HealthCareProvider> AddHealthCareProvider(Guid medicalCenterId, ApplicationUser user, RegistrationHealthCareProviderRequest request)
    {
        var healthCareProvider = new HealthCareProvider
        {
            Id = user.Id,
            LocalRegistrationNumber = request.LocalRegistrationNumber,
            NationalRegistrationNumber = request.NationalRegistrationNumber,
        };

        healthCareProvider.HealthCareProviderMedicalCenters.Add(
            new HealthCareProviderMedicalCenter
            {
                Id = Guid.NewGuid(),
                MedicalCenterId = medicalCenterId
            });

        var specialities = await _specialityRepository.GetSpecialitiesByIds(request.SpecialitiesIds);
        foreach (var speciality in specialities)
        {
            healthCareProvider.HealthCareProviderSpecialities.Add(
                new HealthCareProviderSpeciality
                {
                    SpecialityId = speciality.Id
                });
        }
        return healthCareProvider;
    }

    private async Task AddPatient(ApplicationUser user, RegistrationRequest request)
    {
        var patient = new Patient
        {
            ApplicationUserId = user.Id,
            BloodType = request.BloodType,
        };

        await _patientRepository.AddAsync(patient);
        await _patientRepository.SaveChangesAsync();
    }

    private async Task AddMedicalCenter(ApplicationUser user, RegistrationMedicalCenterRequest request)
    {
        var medicalCenter = new MedicalCenter
        {
            Id = user.Id,
            Name = request.Name,
            CUIT = request.CUIT,
        };

        await _medicalCenterRepository.AddAsync(medicalCenter);
        await _medicalCenterRepository.SaveChangesAsync();
    }

    public async Task<AuthenticatedUserReponse> FindByIdAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            return null;
        }
        var userDto = _mapper.Map<AuthenticatedUserReponse>(user);

        return userDto;
    }

}

