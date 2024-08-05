namespace Domain.Entities
{
    public class HealthCareProviderMedicalCenter : BaseEntity<Guid>
    {
        public Guid HealthCareProviderId { get; set; }
        public HealthCareProvider HealthCareProvider { get; set; }
        public Guid MedicalCenterId { get; set; }
        public MedicalCenter MedicalCenter { get; set; }
        public ICollection<Record> Records { get; set; }
    }
}
