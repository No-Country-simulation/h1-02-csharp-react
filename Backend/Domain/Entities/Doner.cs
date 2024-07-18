using Utilities.Enums;

namespace Domain.Entities
{
    public class Doner : BaseEntity<Guid>
    {
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        public BloodType BloodType { get; set; }
    }
}
