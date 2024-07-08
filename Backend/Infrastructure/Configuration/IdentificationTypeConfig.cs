using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration;

public class IdentificationTypeConfig : IEntityTypeConfiguration<IdentificationType>
{
    public void Configure(EntityTypeBuilder<IdentificationType> builder)
    {
        builder.HasData(
            new IdentificationType { Id = new Guid("7bb44abb-5730-4ef9-be12-d0018c8dd51b"), Name = "DU"},
            new IdentificationType { Id = new Guid("72c5036f-d85c-43c7-9c2a-cd05b1ca7f84"), Name = "LC"},
            new IdentificationType { Id = new Guid("8363b83e-5473-493d-a033-993e6d735f76"), Name = "LE"}
        );
    }
}
