using Domain.SoftDelete;

namespace Domain.Entities
{
    public class Record : BaseEntity<Guid>, ISoftDeletable
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        public Guid PathologyId { get; set; }
        public Pathology Pathology { get; set; }
        public Guid HealthCareProviderMedicalCenterId { get; set; }
        public HealthCareProviderMedicalCenter HealthCareProviderMedicalCenter { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? DeletedOnUtc { get; set; }
    }
}
