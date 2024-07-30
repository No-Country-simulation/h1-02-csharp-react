namespace DTOs.Authentication;

public class RegistrationHealthCareProviderRequest : RegistrationUserRequest
{
    public string LocalRegistrationNumber { get; set; } = string.Empty;

    public string NationalRegistrationNumber { get; set; } = string.Empty;

    public List<Guid> SpecialitiesIds { get; set; } = [];
}
