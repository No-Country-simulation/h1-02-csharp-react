namespace Domain.Entities
{
    public class Doner : BaseEntity<Guid>
    {
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        public Guid BloodTypeId { get; set; }
        public BloodType BloodType { get; set; }
    }
}
