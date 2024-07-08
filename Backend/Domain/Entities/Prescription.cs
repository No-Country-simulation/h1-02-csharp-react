namespace Domain.Entities
{
    public class Prescription : BaseEntity<Guid>
    {
        public DateTime CreatedDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Status { get; set; }
        public string Dosage { get; set; }
        public int DosageInterval { get; set; }
        public Guid TreatmentId { get; set; }
        public Treatment Treatment { get; set; }
        public Guid DrugId { get; set; }
        public Drug Drug { get; set; }
    }
}
