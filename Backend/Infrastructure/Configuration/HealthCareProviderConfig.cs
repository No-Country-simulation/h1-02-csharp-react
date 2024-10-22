﻿using Domain.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Configuration
{
    public class HealthCareProviderConfig : IEntityTypeConfiguration<HealthCareProvider>
    {
        public void Configure(EntityTypeBuilder<HealthCareProvider> builder)
        {
            builder.Property(x => x.Id).HasDefaultValueSql("NEWID()");
            builder
                .Property(x => x.NationalRegistrationNumber)
                .HasMaxLength(10);
                
            builder
                .Property(x => x.LocalRegistrationNumber)
                .HasMaxLength(10);
        }
    }
}