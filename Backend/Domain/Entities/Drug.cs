namespace Domain.Entities
{
    public class Drug : BaseEntity<Guid>
    {
        public string Description { get; set; }
        public ICollection<Prescription> Prescriptions { get; set; }
    }
}
