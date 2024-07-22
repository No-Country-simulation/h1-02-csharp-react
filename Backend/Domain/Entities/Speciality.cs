namespace Domain.Entities;

public class Speciality : BaseEntity<Guid>
{
    public string Description { get; set; } = string.Empty;

    public ICollection<HealthCareProviderSpeciality> HealthCareProviderSpecialities { get; set; } = new List<HealthCareProviderSpeciality>();
    public ICollection<Pathology> Pathologies { get; set; }
}
