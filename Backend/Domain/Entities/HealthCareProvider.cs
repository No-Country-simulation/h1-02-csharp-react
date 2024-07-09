namespace Domain.Entities;

public class HealthCareProvider : BaseEntity<Guid>
{
    public Guid ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; } = null!;
    public string LocalRegistrationNumber { get; set; } = string.Empty;
    public string NationalRegistrationNumber { get; set; } = string.Empty;
    public ICollection<Speciality> Specialities { get; set; } = null!;
    public ICollection<HealthCareProviderMedicalCenter> HealthCareProvidersMedicalCenter { get; set; }
}
