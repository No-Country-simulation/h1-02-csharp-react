namespace Domain.Entities;

public class Speciality
{
    public int Id { get; set; }
    public string Description { get; set; } = string.Empty;

    public string HealthCareProviderId { get; set; }
    public HealthCareProvider HealthCareProvider { get; set; }
}
