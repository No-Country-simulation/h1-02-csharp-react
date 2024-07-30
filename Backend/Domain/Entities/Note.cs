namespace Domain.Entities
{
    public class Note : BaseEntity<Guid>
    {
        public string? Title { get; set; }
        public string Description { get; set; }
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
    }
}
