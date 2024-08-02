namespace Domain.Entities
{
    public class Allergy : BaseEntity<Guid>
    {
        public string name { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}
