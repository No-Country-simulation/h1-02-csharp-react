using DTOs.Speciality;
using FluentValidation;

namespace Application.Validators.Speciality;

public class AddSpecialityValidator : AbstractValidator<AddSpecialityDto>
{
    public AddSpecialityValidator()
    {
        RuleFor(p => p.Description)
            .NotEmpty().WithMessage("{PropertyName} is required.")
            .MaximumLength(60).WithMessage("{PropertyName} cannot be more than {MaxLength} characters");
    }
}