namespace Domain.Entities
{
    public class Allergy : BaseEntity<Guid>
    {
        public string Name { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}
