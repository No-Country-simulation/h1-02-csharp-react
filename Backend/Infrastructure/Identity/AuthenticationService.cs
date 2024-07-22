using Application.Contracts.Persistence;
using Application.Contracts.Services;
using Application.Models.Authentication;
using AutoMapper;
using Domain.Entities;
using DTOs.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Persistence.Repositories;
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
    private readonly IHealthCareProviderSpecialityRepository _healthCareProviderSpecialityRepository;
    private readonly IPatientRepository _patientRepository;
    private readonly IMapper _mapper;


    public AuthenticationService(
        UserManager<ApplicationUser> userManager,
        IOptions<JwtSettings> jwtSettings,
        SignInManager<ApplicationUser> signInManager,
        IHealthCareProviderRepository healthCareProviderRepository,
        ISpecialityRepository specialityRepository,
        IHealthCareProviderSpecialityRepository healthCareProviderSpecialityRepository,
        IPatientRepository pacientRepository,
        IMapper mapper)
    {
        _userManager = userManager;
        _jwtSettings = jwtSettings.Value;
        _signInManager = signInManager;
        _healthCareProviderRepository = healthCareProviderRepository;
        _specialityRepository = specialityRepository;
        _healthCareProviderSpecialityRepository = healthCareProviderSpecialityRepository;
        _patientRepository = pacientRepository;
        _mapper = mapper;
    }

    public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
        {
            throw new Exception($"User with {request.Email} not found.");
        }

        var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            throw new Exception($"The credentials are not valid.");
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
                        await AddHealthCareProvider(user, request);
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

    private async Task AddHealthCareProvider(ApplicationUser user, RegistrationRequest request)
    {
        var healthCareProvider = new HealthCareProvider
        {
            LocalRegistrationNumber = request.LocalRegistrationNumber,
            NationalRegistrationNumber = request.NationalRegistrationNumber,
            //Specialities = specialities.ToList(),
            ApplicationUserId = user.Id
        };

        var specialities = await _specialityRepository.GetSpecialitiesByIds(request.SpecialitiesIds);
        foreach (var speciality in specialities)
        {
            healthCareProvider.HealthCareProviderSpecialities.Add(new HealthCareProviderSpeciality
            {
                SpecialityId = speciality.Id
            });
        }
        await _healthCareProviderRepository.AddAsync(healthCareProvider);
        await _healthCareProviderRepository.SaveChangesAsync();
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

