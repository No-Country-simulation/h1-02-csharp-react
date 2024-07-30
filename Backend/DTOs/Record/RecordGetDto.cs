namespace DTOs.Record
{
    public class RecordGetDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string PathologyDescription { get; set; }
        public string MedicalCenterName { get; set; }
        public string HealthCareProviderName { get; set; }
        public string HealthCareProviderLastName { get; set; }
    }
}
