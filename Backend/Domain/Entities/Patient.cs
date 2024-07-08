namespace Domain.Entities
{
    public class Patient : BaseEntity<Guid>
    {
        public Guid ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public Guid BloodTypeId { get; set; }
        public BloodType BloodType { get; set; }
        public Doner? Doner { get; set; }
        public ICollection<MedicalRecord> MedicalRecords { get; set; }
        public ICollection<MedicalCenter> MedicalCenters { get; set; }
    }
}
