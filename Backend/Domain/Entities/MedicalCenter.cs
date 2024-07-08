namespace Domain.Entities
{
    public class MedicalCenter : BaseEntity<Guid>
    {
        public string Name { get; set; }
        public string CUIT { get; set; }
        public ICollection<HealthCareProvider> HealthCareProviders { get; set; }
        public ICollection<Record> Records { get; set; }
        public ICollection<Patient> Patients { get; set; }
    }
}
