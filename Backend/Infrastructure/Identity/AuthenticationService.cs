using Core.Contracts.Services;
using Core.Models.Authentication;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Identity;

public class AuthenticationService : IAuthenticationService
{
    public readonly UserManager<ApplicationUser> _userManager;
    public readonly SignInManager<ApplicationUser> _signInManager;
    public readonly JwtSettings _jwtSettings;


    public AuthenticationService(
        UserManager<ApplicationUser> userManager,
        IOptions<JwtSettings> jwtSettings,
        SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _jwtSettings = jwtSettings.Value;
        _signInManager = signInManager;
    }

    public async Task<AuthenticationResponse> AuthenticateAsync(AuthenticationRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
        {
            throw new Exception($"Usuario con {request.Email} no encontrado.");
        }

        var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);

        if (!result.Succeeded)
        {
            throw new Exception($"Las credenciales para '{request.Email} no son válidas.");
        }

        JwtSecurityToken jwtSecurityToken = await GenerateToken(user);

        AuthenticationResponse response = new AuthenticationResponse
        {
            Id = user.Id,
            Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
            Email = user.Email,
            UserName = user.UserName
        };

        return response;
    }

    public async Task<RegistrationResponse> RegisterAsync(RegistrationRequest request)
    {
        var existingEmail = await _userManager.FindByEmailAsync(request.Email);

        if (existingEmail != null)
        {
            throw new Exception($"Email '{request.Email}' ya existe");
        }

        var user = new ApplicationUser
        {
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName,
            UserName = request.Email,
            // Modify email confirmation
            EmailConfirmed = true
        };

        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            throw new Exception($"{string.Join(", ", result.Errors.Select(e => e.Description))}");
        }

        // Edit Roles
        var roleResult = await _userManager.AddToRoleAsync(user, "User");

        if (!roleResult.Succeeded)
        {
            await _userManager.DeleteAsync(user);
            throw new Exception($"Error asignando el rol: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
        }

        return new RegistrationResponse() { UserId = user.Id };

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
            new Claim("uid", user.Id),
            //new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
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
}

