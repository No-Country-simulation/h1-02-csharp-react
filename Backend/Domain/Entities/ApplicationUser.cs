using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class ApplicationUser : IdentityUser<Guid>
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime Birthdate { get; set; }
    public string Gender { get; set; } = string.Empty;

    public Patient? Patient { get; set; }
    public HealthCareProvider? HealthCareProvider { get; set; }
    public Guid IdentificationTypeId { get; set; }
    public IdentificationType IdentificationType { get; set; } = null!;
    public string IdentificationNumber { get; set; } = string.Empty;

}
