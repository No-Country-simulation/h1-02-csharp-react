using Domain.Entities;

namespace DTOs.Speciality;

public class GetSpecialityDto
{
    //public Guid Id { get; set; }
    public string Description { get; set; } = string.Empty;
    public ICollection<string> HealthCareProviders { get; set; } = new List<string>();

}
