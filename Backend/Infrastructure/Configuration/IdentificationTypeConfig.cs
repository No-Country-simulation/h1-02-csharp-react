using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration;

public class IdentificationTypeConfig : IEntityTypeConfiguration<IdentificationType>
{
    public void Configure(EntityTypeBuilder<IdentificationType> builder)
    {
        builder.HasData(
            new IdentificationType { Id = 1, Name = "DU"},
            new IdentificationType { Id = 2, Name = "LC"},
            new IdentificationType { Id = 3, Name = "LE"}
        );
    }
}
