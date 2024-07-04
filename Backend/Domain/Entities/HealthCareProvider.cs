namespace Domain.Entities;

public class HealthCareProvider
{
    public string Id { get; set; }
    public ApplicationUser ApplicationUser { get; set; } = null!;
    public ICollection<Speciality> Specialities { get; set; } = null!;
    public string LocalRegistrationNumber { get; set; } = string.Empty;
    public string NationalRegistrationNumber { get; set; } = string.Empty;
}
