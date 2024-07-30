using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Persistence.Configuration;

public class HealthCareProviderMedicalCenterConfig : IEntityTypeConfiguration<HealthCareProviderMedicalCenter>
{
    public void Configure(EntityTypeBuilder<HealthCareProviderMedicalCenter> builder)
    {
        //builder
        //    .HasKey(hcpmc => new { hcpmc.Id });

        builder
            .HasOne(hcp => hcp.HealthCareProvider)
            .WithMany(hcpmc => hcpmc.HealthCareProviderMedicalCenters)
            .HasForeignKey(hcpmc => hcpmc.HealthCareProviderId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(hcpmc => hcpmc.MedicalCenter)
            .WithMany(mc => mc.HealthCareProviderMedicalCenters)
            .HasForeignKey(hcpmc => hcpmc.MedicalCenterId)
            .OnDelete(DeleteBehavior.NoAction);

        // Disable cascade delete to not delete existing records
        builder.HasMany(d => d.Records)
            .WithOne(p => p.HealthCareProviderMedicalCenter)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
