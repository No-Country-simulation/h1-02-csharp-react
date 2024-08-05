namespace DTOs.MedicalTest;

public class GetMedicalTestDto
{
    public Guid Id { get; set; }
    public string TestName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public DateTime TestDate { get; set; }
}
