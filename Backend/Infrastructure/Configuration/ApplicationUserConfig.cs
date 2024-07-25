using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Configuration;

public class ApplicationUserConfig : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder
            .HasOne(au => au.HealthCareProvider)
            .WithOne(hcp => hcp.ApplicationUser)
            .HasForeignKey<HealthCareProvider>(hcp => hcp.Id)
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .HasOne(au => au.MedicalCenter)
            .WithOne(mc => mc.ApplicationUser)
            .HasForeignKey<MedicalCenter>(mc => mc.Id)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
