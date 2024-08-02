using Domain.SoftDelete;
using Utilities.Enums;

namespace Domain.Entities
{
    public class Patient : BaseEntity<Guid>, ISoftDeletable
    {
        public Guid ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public BloodType BloodType { get; set; }
        public string? Weight { get; set; }
        public ICollection<Record>? Records { get; set; }
        public ICollection<MedicalCenter>? MedicalCenters { get; set; }
        public ICollection<Note>? Notes { get; set; }
        public ICollection<TaskItem>? TaskList { get; set; }
        public ICollection<Disease>? ChronicDiseases { get; set; }
        public ICollection<Drug>? ChronicDrugs { get; set; }
        public ICollection<Allergy>? Allergies { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOnUtc { get; set; }
    }
}
