namespace DTOs.Patient
{
    public class PatientUpdateDto
    {
        public Guid Id { get; set; }
        public DateTime BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int BloodType { get; set; }
        public string IdentificationNumber { get; set; }
    }
}
