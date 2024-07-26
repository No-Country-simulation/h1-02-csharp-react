using System.ComponentModel.DataAnnotations;

namespace DTOs.Authentication;

public class RegistrationMedicalCenterRequest : RegistrationUserCentersRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;
 
    [Required]
    public string CUIT { get; set; } = string.Empty;
}
