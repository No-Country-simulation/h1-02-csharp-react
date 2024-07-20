using AutoMapper;
using Domain.Entities;
using DTOs.HealthCareProvider;

namespace Mappings.Profiles
{
    public class HealthCareProviderProfile : Profile
    {
        public HealthCareProviderProfile()
        {
            CreateMap<HealthCareProvider, HealthCareProviderGetByIdDto>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.ApplicationUser.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.ApplicationUser.LastName))
                .ForMember(dest => dest.BirthDate, opt => opt.MapFrom(src => src.ApplicationUser.Birthdate))
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => src.ApplicationUser.Gender))
                .ForMember(dest => dest.IdentificationType, opt => opt.MapFrom(src => src.ApplicationUser.IdentificationType))
                .ForMember(dest => dest.IdentificationNumber, opt => opt.MapFrom(src => src.ApplicationUser.IdentificationNumber))
                .ForMember(dest => dest.LocalRegistrationNumber, opt => opt.MapFrom(src => src.LocalRegistrationNumber))
                .ForMember(dest => dest.NationalRegistrationNumber, opt => opt.MapFrom(src => src.NationalRegistrationNumber))
                .ForMember(dest => dest.Specialities, opt => opt.MapFrom(src => src.HealthCareProviderSpecialities.Select(hps => hps.Speciality.Description).ToList()));
            CreateMap<HealthCareProvider, HealthCareProviderUpdateDto>();

        }
    }
}
