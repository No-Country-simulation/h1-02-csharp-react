using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Infrastructure.Data;

public class JustinaDbContext : IdentityDbContext<ApplicationUser, IdentityRole, string>
{
    public JustinaDbContext(DbContextOptions<JustinaDbContext> options) : base(options)
    {
    }

    public DbSet<HealthCareProvider> HealthCareProviders { get; set; }
    public DbSet<Speciality> Specialities { get; set; }
    public DbSet<IdentificationType> IdentificationTypes { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    }
}
