namespace Domain.Entities
{
    public class MedicalCenter : BaseEntity<Guid>
    {
        public string Name { get; set; }
        public string CUIT { get; set; }
        public ICollection<HealthCareProviderMedicalCenter> HealthCareProviderMedicalCenters { get; set; }
        public ICollection<Patient> Patients { get; set; }
    }
}
