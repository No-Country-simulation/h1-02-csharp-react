namespace DTOs.Patient
{
    public class PatientGetDto
    {
        public Guid Id { get; set; }
        public Guid ApplicationUserId { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BloodTypeDescription { get; set; }
        public string IdentificationTypeDescription { get; set; }
        public string IdentificationNumber { get; set; }
        public string Weight { get; set; }
    }
}
