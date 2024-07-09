namespace Domain.Entities;

public class IdentificationType : BaseEntity<Guid>
{
    public string Name { get; set; } = null!;

    public ICollection<ApplicationUser> Users { get; set; } = null!;
}
