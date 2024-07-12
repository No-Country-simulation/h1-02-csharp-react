using Microsoft.AspNetCore.Identity;
using Utilities.Enums;

namespace Domain.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime Birthdate { get; set; }
    public string Gender { get; set; } = string.Empty;
    public AccountType AccountType { get; set; }

    public Patient? Patient { get; set; }
    public HealthCareProvider? HealthCareProvider { get; set; }
    public Guid IdentificationTypeId { get; set; }
    public IdentificationType IdentificationType { get; set; } = null!;
    public string IdentificationNumber { get; set; } = string.Empty;

}
