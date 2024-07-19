using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration;

public class HealthCareProviderSpecilityConfig : IEntityTypeConfiguration<HealthCareProviderSpeciality>
{
    public void Configure(EntityTypeBuilder<HealthCareProviderSpeciality> builder)
    {
        builder
            .HasKey(hps => new { hps.HealthCareProviderId, hps.SpecialityId });

        builder
            .HasOne(hps => hps.HealthCareProvider)
            .WithMany(hp => hp.HealthCareProviderSpecialities)
            .HasForeignKey(hps => hps.HealthCareProviderId);

        builder
            .HasOne(hps => hps.Speciality)
            .WithMany(s => s.HealthCareProviderSpecialities)
            .HasForeignKey(hps => hps.SpecialityId);
    }

}
