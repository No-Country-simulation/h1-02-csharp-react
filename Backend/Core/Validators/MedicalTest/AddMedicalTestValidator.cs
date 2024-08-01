using DTOs.MedicalTest;
using FluentValidation;

namespace Application.Validators.MedicalTest;

public class AddMedicalTestValidator : AbstractValidator<CreateMedicalTestDto>
{
    public AddMedicalTestValidator()
    {
        RuleFor(p => p.PatientId)
             .NotEmpty().WithMessage("{PropertyName} is required.");

        RuleFor(p => p.TestName)
            .NotEmpty().WithMessage("{PropertyName} is required.")
            .MaximumLength(60).WithMessage("{PropertyName} cannot be more than {MaxLength} characters");
        
        RuleFor(p => p.FileUrl)
              .NotEmpty().WithMessage("{PropertyName} is required.")
              .MaximumLength(200).WithMessage("{PropertyName} cannot be more than {MaxLength} characters");

        RuleFor(p => p.TestDate)
               .NotEmpty().WithMessage("{PropertyName} is required.")
               .LessThanOrEqualTo(DateTime.Now).WithMessage("{PropertyName} cannot be in the future.");
    }
}