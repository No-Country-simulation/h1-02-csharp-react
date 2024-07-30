
namespace DTOs.HealthCareProvider;

public class GetHealthCareProvidersDto
{
    //public Guid ApplicationUserId { get; set; }
    public Guid Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime BirthDate { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string LocalRegistrationNumber { get; set; } = string.Empty;
    public string NationalRegistrationNumber { get; set; } = string.Empty;
}
