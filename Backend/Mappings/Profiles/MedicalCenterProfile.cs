using AutoMapper;
using Domain.Entities;
using DTOs.HealthCareProvider;
using DTOs.MedicalCenter;
using Utilities.Enums.ExtensionMethods;

namespace Mappings.Profiles;

public class MedicalCenterProfile : Profile
{
    public MedicalCenterProfile()
    {
        // GetAll - Role Admin
        CreateMap<MedicalCenter, GetMedicalCentersDto>()
            //.ForMember(dest => dest.ApplicationUserId, opt => opt.MapFrom(src => src.ApplicationUser.Id))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ApplicationUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber));

        // GetById - Role Admin ...
        CreateMap<MedicalCenter, GetByIdMedicalCenterDto>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.ApplicationUser.Email))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.ApplicationUser.PhoneNumber))
            .ForMember(dest => dest.HealthCareProviders, opt => opt.MapFrom(
                src => src.HealthCareProviderMedicalCenters
                .Select(hps => hps.HealthCareProvider)
                .ToList()));
    }
}
