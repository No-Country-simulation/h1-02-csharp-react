namespace Domain.Entities;

public class HealthCareProviderSpeciality
{
    public Guid HealthCareProviderId { get; set; }
    public HealthCareProvider HealthCareProvider { get; set; }

    public Guid SpecialityId { get; set; }
    public Speciality Speciality { get; set; }
}
