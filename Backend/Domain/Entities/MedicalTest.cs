using Domain.SoftDelete;

namespace Domain.Entities;

public class MedicalTest : BaseEntity<Guid>, ISoftDeletable
{
    public Guid PatientId { get; set; }
    public string TestName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public DateTime TestDate { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedOnUtc { get; set; }
}
