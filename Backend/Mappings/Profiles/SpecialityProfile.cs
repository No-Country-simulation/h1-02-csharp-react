using AutoMapper;
using Domain.Entities;
using DTOs.Speciality;

namespace Mappings.Profiles;

public class SpecialityProfile : Profile
{
    public SpecialityProfile()
    {
        CreateMap<Speciality, GetSpecialitiesDto>();

        CreateMap<Speciality, GetSpecialityDto>()
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.HealthCareProviders,
                opt => opt.MapFrom(src =>
                src.HealthCareProviderSpecialities.Select(
                    hps => hps.HealthCareProvider.ApplicationUser.FirstName + " - " +
                           hps.HealthCareProvider.ApplicationUser.LastName)
                .ToList()));

        CreateMap<AddSpecialityDto, Speciality>();

        CreateMap<UpdateSpecialityDto, Speciality>();
    }
}
