using Domain.Entities;
using Domain.SoftDelete;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Persistence.Interceptors;
using System.Reflection;

namespace Persistence.Data;

public class JustinaDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public JustinaDbContext(DbContextOptions<JustinaDbContext> options) : base(options)
    {
    }

    public DbSet<HealthCareProvider> HealthCareProviders { get; set; }
    public DbSet<Speciality> Specialities { get; set; }
    public DbSet<HealthCareProviderSpeciality> HealthCareProviderSpecialities { get; set; }
    public DbSet<HealthCareProviderMedicalCenter> HealthCareProviderMedicalCenter { get; set; }
    public DbSet<Patient> Patients { get; set; }
    public DbSet<Drug> Drugs { get; set; }
    public DbSet<MedicalCenter> MedicalCenters { get; set; }
    public DbSet<Pathology> Pathologies { get; set; }
    public DbSet<Record> Records { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<TaskItem> TaskItems { get; set; }
    public DbSet<Disease> Diseases { get; set; }
    public DbSet<Allergy> Allergies { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        foreach (var type in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDeletable).IsAssignableFrom(type.ClrType))
                modelBuilder.SetSoftDeleteFilter(type.ClrType);
        }

    }
}
