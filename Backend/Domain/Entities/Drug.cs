namespace Domain.Entities
{
    public class Drug : BaseEntity<Guid>
    {
        public string Description { get; set; }
        public ICollection<Patient> Patients { get; set; }
    }
}
