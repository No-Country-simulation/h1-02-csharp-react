namespace DTOs.MedicalTest;

public class AddMedicalTestDto
{
    public Guid PatientId { get; set; }
    public string TestName { get; set; } = string.Empty;
    public DateTime TestDate { get; set; }
}
