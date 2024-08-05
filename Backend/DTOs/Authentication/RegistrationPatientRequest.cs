using Utilities.Enums;

namespace DTOs.Authentication;

public class RegistrationPatientRequest : RegistrationUserRequest
{
    public BloodType BloodType { get; set; }
}
