using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Persistence.Configuration
{
    public class HealthCareProviderMedicalCenterConfig : IEntityTypeConfiguration<HealthCareProviderMedicalCenter>
    {
        public void Configure(EntityTypeBuilder<HealthCareProviderMedicalCenter> builder)
        {
            // Disable cascade delete to not delete existing records
            builder.HasMany(d => d.Records)
                .WithOne(p => p.HealthCareProviderMedicalCenter)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
