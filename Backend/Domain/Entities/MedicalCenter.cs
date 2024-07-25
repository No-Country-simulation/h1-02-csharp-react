using Domain.SoftDelete;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class MedicalCenter : BaseEntity<Guid>, ISoftDeletable
{
    //public Guid ApplicationUserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    public string Name { get; set; } = string.Empty;
    public string CUIT { get; set; } = string.Empty;
    public ICollection<HealthCareProviderMedicalCenter> HealthCareProviderMedicalCenters { get; set; }
    public ICollection<Patient> Patients { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedOnUtc { get; set; }
}
