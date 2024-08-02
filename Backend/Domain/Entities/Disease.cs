namespace Domain.Entities
{
    public class Disease : BaseEntity<Guid>
    {
        public string Name { get; set; }
        public ICollection<Patient> Patients { get; set; }
    }
}
