using System.ComponentModel.DataAnnotations;

namespace DTOs.Authentication;

public class RegistrationUserCentersRequest
{
    [Required]
    public string PhoneNumber { get; set; } = string.Empty;

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
