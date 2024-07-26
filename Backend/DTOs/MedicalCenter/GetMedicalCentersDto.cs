namespace DTOs.MedicalCenter;

public class GetMedicalCentersDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CUIT { get; set; } = string.Empty;
}
