namespace DTOs.Record
{
    public class RecordAddDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string MedicalCenterCuit {  get; set; }
        public string PatientIdentificationNumber { get; set; }
        public string PathologyDescription { get; set; }
        public string HealthCareProviderIdentificationNumber { get; set; }
    }
}
