namespace DTOs.MedicalTest;

public class CreateMedicalTestDto
{
    public Guid PatientId { get; set; }
    public string TestName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public DateTime TestDate { get; set; }
}
