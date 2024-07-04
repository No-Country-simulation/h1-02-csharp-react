
namespace Domain.Entities;

public class IdentificationType
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public ICollection<ApplicationUser> Users { get; set; } = null!;
}
