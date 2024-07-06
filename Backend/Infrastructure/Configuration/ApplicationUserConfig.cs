using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ApplicationUserConfig : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder
                .HasOne(u => u.IdentificationType)
                .WithMany(i => i.Users)
                .HasForeignKey(u => u.IdentificationTypeId);
            
            builder
                .HasOne(u => u.HealthCareProvider)
                .WithOne(h => h.User)
                .HasForeignKey<HealthCareProvider>(h => h.Id);
        }
    }
}
