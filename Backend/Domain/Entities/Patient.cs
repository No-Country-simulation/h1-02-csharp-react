using Domain.SoftDelete;
using Utilities.Enums;

namespace Domain.Entities
{
    public class Patient : BaseEntity<Guid>, ISoftDeletable
    {
        public Guid ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public BloodType BloodType { get; set; }
        public Doner? Doner { get; set; }
        public ICollection<MedicalRecord> MedicalRecords { get; set; }
        public ICollection<MedicalCenter> MedicalCenters { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOnUtc { get; set; }
    }
}
