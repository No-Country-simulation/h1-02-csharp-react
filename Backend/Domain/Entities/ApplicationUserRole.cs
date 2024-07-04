using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class ApplicationUserRole : IdentityUserRole<string>
{
    public virtual ApplicationUser User { get; set; } = null!;
    public virtual IdentityRole Role { get; set; } = null!;
}