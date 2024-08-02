using AutoMapper;
using Domain.Entities;
using DTOs.HealthCareProvider;
using Utilities.Enums.ExtensionMethods;

namespace Mappings.Profiles;

public class HealthCareProviderProfile : Profile
{
    public HealthCareProviderProfile()
    {
        // GetAll - Role MedicalCenter
        CreateMap<HealthCareProvider, GetHealthCareProvidersDto>()
            //.ForMember(dest => dest.ApplicationUserId, opt => opt.MapFrom(src => src.ApplicationUser.Id))
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.ApplicationUser.FirstName))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.ApplicationUser.LastName))
            .ForMember(dest => dest.BirthDate, opt => opt.MapFrom(src => src.ApplicationUser.Birthdate))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ApplicationUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber))
            .ForMember(dest => dest.IdentificationNumber, opt => opt.MapFrom(src => src.ApplicationUser.IdentificationNumber));

        // GetById - Role HealthCareProvider
        CreateMap<HealthCareProvider, GetByIdHealthCareProviderDto>()
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.ApplicationUser.FirstName))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.ApplicationUser.LastName))
            .ForMember(dest => dest.BirthDate, opt => opt.MapFrom(src => src.ApplicationUser.Birthdate))
            .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.ApplicationUser.Gender))
            .ForMember(dest => dest.IdentificationTypeDescription, opt => opt.MapFrom(src => src.ApplicationUser.IdentificationType.GetDescription()))
            .ForMember(dest => dest.IdentificationNumber, opt => opt.MapFrom(src => src.ApplicationUser.IdentificationNumber))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ApplicationUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber))
            .ForMember(dest => dest.LocalRegistrationNumber, opt => opt.MapFrom(src => src.LocalRegistrationNumber))
            .ForMember(dest => dest.NationalRegistrationNumber, opt => opt.MapFrom(src => src.NationalRegistrationNumber))
            .ForMember(dest => dest.Specialities, opt => opt.MapFrom(src => src.HealthCareProviderSpecialities.Select(hps => hps.Speciality.Description).ToList()));

        // Update - Role MedicalCenter
        CreateMap<UpdateHealthCareProviderDto, ApplicationUser>()
            .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
            .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
            .ForMember(dest => dest.Birthdate, opt => opt.MapFrom(src => src.BirthDate));

        CreateMap<UpdateHealthCareProviderDto, HealthCareProvider>();

    }
}
