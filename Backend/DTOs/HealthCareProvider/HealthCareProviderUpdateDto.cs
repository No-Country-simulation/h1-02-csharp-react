namespace DTOs.HealthCareProvider;

public class HealthCareProviderUpdateDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }

    public string LocalRegistrationNumber { get; set; } = string.Empty;
    public string NationalRegistrationNumber { get; set; } = string.Empty;
    public ICollection<Guid> SpecialityIds { get; set; } = new List<Guid>();
    //public ICollection<Speciality> Specialities { get; set; } = null!;
}
