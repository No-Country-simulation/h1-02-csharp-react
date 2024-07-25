using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace Persistence.Configuration;

public class MedicalCenterConfig : IEntityTypeConfiguration<MedicalCenter>
{
    public void Configure(EntityTypeBuilder<MedicalCenter> builder)
    {
        builder 
            .HasMany(mc => mc.Patients)
            .WithMany(p => p.MedicalCenters)
            .UsingEntity<Dictionary<string, object>>(
                "MedicalCenterPatient",
                mc => mc.HasOne<Patient>()
                    .WithMany()
                    .HasForeignKey("PatientsId")
                    .OnDelete(DeleteBehavior.NoAction), 
                p => p.HasOne<MedicalCenter>()
                    .WithMany()
                    .HasForeignKey("MedicalCentersId")
                    .OnDelete(DeleteBehavior.NoAction));

        builder
            .Property(x => x.Name)
            .HasMaxLength(100);

        builder
            .Property(x => x.CUIT)
            .HasMaxLength(14);
    }
}