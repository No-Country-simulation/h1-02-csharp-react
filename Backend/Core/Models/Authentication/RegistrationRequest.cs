using System.ComponentModel.DataAnnotations;

namespace Core.Models.Authentication;

public class RegistrationRequest
{
    [Required]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public string PhoneNumber { get; set; } = string.Empty;

    [Required]
    public string Speciality { get; set; } = string.Empty;

    public string MP { get; set; } = string.Empty;

    public string MN { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string EmailConfirmed { get; set; } = string.Empty;
    
    [Required]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;
}