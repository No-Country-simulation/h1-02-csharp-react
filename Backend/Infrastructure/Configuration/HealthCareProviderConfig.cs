using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration;

public class HealthCareProviderConfig : IEntityTypeConfiguration<HealthCareProvider>
{
    public void Configure(EntityTypeBuilder<HealthCareProvider> builder)
    {
        builder.HasMany(h => h.Specialities)
            .WithOne(s => s.HealthCareProvider)
            .HasForeignKey(s => s.HealthCareProviderId);
    }
}
