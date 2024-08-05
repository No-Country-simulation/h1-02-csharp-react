using AutoMapper;
using Domain.Entities;
using DTOs.Patient;
using Utilities.Enums.ExtensionMethods;

namespace Mappings.Profiles
{
    public class PatientProfile : Profile
    {
        public PatientProfile()
        {
            CreateMap<Patient, PatientGetDto>()
                .ForMember(dest => dest.ApplicationUserId, opt => opt.MapFrom(src => src.ApplicationUser.Id))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ApplicationUser.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.ApplicationUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.ApplicationUser.LastName))
                .ForMember(dest => dest.BirthDate, opt => opt.MapFrom(src => src.ApplicationUser.Birthdate))
                .ForMember(dest => dest.BloodTypeDescription, opt => opt.MapFrom(src => src.BloodType.GetDescription()))
                .ForMember(dest => dest.IdentificationTypeDescription, opt => opt.MapFrom(src => src.ApplicationUser.IdentificationType.GetDescription()))
                .ForMember(dest => dest.IdentificationNumber, opt => opt.MapFrom(src => src.ApplicationUser.IdentificationNumber));

            CreateMap<PatientUpdateDto, Patient>()
                .ForPath(dest => dest.ApplicationUser.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForPath(dest => dest.ApplicationUser.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForPath(dest => dest.ApplicationUser.Birthdate, opt => opt.MapFrom(src => src.BirthDate))
                .ForPath(dest => dest.ApplicationUser.IdentificationNumber, opt => opt.MapFrom(src => src.IdentificationNumber))
                .ForPath(dest => dest.ApplicationUser.IdentificationType, opt => opt.MapFrom(src => src.IdentificationType))
                .ForPath(dest => dest.ApplicationUser.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber));
        }
    }
}
