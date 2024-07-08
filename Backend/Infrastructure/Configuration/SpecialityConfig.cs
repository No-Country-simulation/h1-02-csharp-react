using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class SpecialityConfig : IEntityTypeConfiguration<Speciality>
    {
        public void Configure(EntityTypeBuilder<Speciality> builder)
        {
            builder.HasData(
                new Speciality { Id = new Guid("a0cbfd25-b2df-4d23-a4c1-be93db165082"), Description = "Cardiología" },
                new Speciality { Id = new Guid("dc85ba2a-0e5a-4228-b93d-af9d86399eee"), Description = "Clínica Médica" },
                new Speciality { Id = new Guid("98ecada4-4ac5-4042-8ac1-7baf2a984d4d"), Description = "Oncología" }
            );
        }
    }
}
