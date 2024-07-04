using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime Birthdate { get; set; }
    public string Gender { get; set; } = string.Empty;

    public int IdentificationTypeId { get; set; }
    public IdentificationType IdentificationType { get; set; } = null!;
    public string IdentificationNumber { get; set; } = string.Empty;

}
