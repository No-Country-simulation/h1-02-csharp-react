using DTOs.HealthCareProvider;

namespace DTOs.MedicalCenter;

public class GetByIdMedicalCenterDto
{
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CUIT { get; set; } = string.Empty;
    public ICollection<GetHealthCareProvidersDto> HealthCareProviders { get; set; }
}
