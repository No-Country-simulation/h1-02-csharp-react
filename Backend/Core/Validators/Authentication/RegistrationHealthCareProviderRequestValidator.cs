using DTOs.Authentication;
using FluentValidation;

namespace Application.Validators.Authentication;

public class RegistrationHealthCareProviderRequestValidator : AbstractValidator<RegistrationHealthCareProviderRequest>
{
    public RegistrationHealthCareProviderRequestValidator()
    {
        // to add later version
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("{PropertyName} is required.");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("{PropertyName} is required.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("{PropertyName} is required.");

        RuleFor(x => x.IdentificationType)
            .IsInEnum().WithMessage("{PropertyName} is required.");

        RuleFor(x => x.IdentificationNumber)
            .NotEmpty().WithMessage("{PropertyName} is required.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("{PropertyName} is required.")
            .EmailAddress().WithMessage("A valid email is required.");

        RuleFor(x => x.EmailConfirmed)
            .NotEmpty().WithMessage("{PropertyName} is required.")
            .EmailAddress().WithMessage("A valid email is required.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("{PropertyName} is required.")
            .MinimumLength(8).WithMessage("{PropertyName} must be at least {MinLength} characters long.");

        RuleFor(x => x.LocalRegistrationNumber)
            .NotEmpty().WithMessage("{PropertyName} is required.");

        //RuleFor(x => x.NationalRegistrationNumber)
        //    .NotEmpty().WithMessage("{PropertyName} is required.");

        RuleFor(x => x.SpecialitiesIds)
            .NotEmpty().WithMessage("{PropertyName} must contain at least one speciality ID.");
    }
}