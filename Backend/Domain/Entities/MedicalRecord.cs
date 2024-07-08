namespace Domain.Entities
{
    public class MedicalRecord : BaseEntity<Guid>
    {
        public DateTime LastModifiedDate { get; set; }
        public Guid LastModifiedBy { get; set; }

        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        public Guid PathologyId { get; set; }
        public Pathology Pathology { get; set; }                
        public ICollection<Record> Records { get; set; }
    }
}
