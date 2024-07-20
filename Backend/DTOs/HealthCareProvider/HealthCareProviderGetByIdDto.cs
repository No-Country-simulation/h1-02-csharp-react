using Utilities.Enums;

namespace DTOs.HealthCareProvider;

public class HealthCareProviderGetByIdDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string IdentificationTypeDescription { get; set; }
    public string IdentificationNumber { get; set; } = string.Empty;

    public string LocalRegistrationNumber { get; set; } = string.Empty;
    public string NationalRegistrationNumber { get; set; } = string.Empty;
    public ICollection<string> Specialities { get; set; } = new List<string>();
}
