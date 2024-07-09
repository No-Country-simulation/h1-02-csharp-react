namespace Domain.Entities;

public class Speciality : BaseEntity<Guid>
{
    public string Description { get; set; } = string.Empty;

    public ICollection<HealthCareProvider> HealtCareProviders { get; set; }
    public ICollection<Pathology> Pathologies { get; set; }
}
