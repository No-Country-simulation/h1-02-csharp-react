
namespace Domain.Entities;

public class HealthCareProvider
{
    public string Id { get; set; }
    public ApplicationUser ApplicationUser { get; set; } = null!;
    public ICollection<Speciality> Specialities { get; set; } = null!;
}
