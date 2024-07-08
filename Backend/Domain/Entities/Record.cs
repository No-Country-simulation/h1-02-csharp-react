namespace Domain.Entities
{
    public class Record : BaseEntity<Guid>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public Guid LastModifiedBy { get; set; }
        public Guid MedicalRecordId { get; set; }
        public MedicalRecord MedicalRecord { get; set; }
        public Guid MedicalCenterId { get; set; }
        public MedicalCenter MedicalCenter { get; set; }
        public Guid HealthCareProviderId { get; set; }
        public HealthCareProvider HealthCareProvider { get; set; }
        public ICollection<Treatment> Treatments { get; set; }
    }
}
