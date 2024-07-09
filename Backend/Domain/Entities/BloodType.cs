namespace Domain.Entities
{
    public class BloodType : BaseEntity<Guid>
    {
        public string Group { get; set; }
        public string RhFactor { get; set; }
        public ICollection<Patient> Patients { get; set; }
        public ICollection<Doner> Doners { get; set; }
    }
}
