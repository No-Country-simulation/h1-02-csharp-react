using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class DonerConfig : IEntityTypeConfiguration<Doner>
    {
        public void Configure(EntityTypeBuilder<Doner> builder)
        {
            // TODO: Check if necessary
            builder.HasOne(d => d.Patient)
                .WithOne(p => p.Doner)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
