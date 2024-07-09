namespace Domain.Entities
{
    public class Pathology : BaseEntity<Guid>
    {
        public string Description { get; set; }

        public Guid SpecialityId { get; set; }
        public Speciality Speciality { get; set; }
        public ICollection<MedicalRecord> MedicalRecords { get; set; }
    }
}
