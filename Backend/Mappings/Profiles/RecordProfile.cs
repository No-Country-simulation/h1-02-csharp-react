using AutoMapper;
using Domain.Entities;
using DTOs.Record;

namespace Mappings.Profiles
{
    public class RecordProfile : Profile
    {
        public RecordProfile()
        {
            CreateMap<Record, RecordGetDto>()
                .ForMember(dest => dest.HealthCareProviderName, opt => opt.MapFrom(src => src.HealthCareProviderMedicalCenter.HealthCareProvider.ApplicationUser.FirstName))
                .ForMember(dest => dest.HealthCareProviderLastName, opt => opt.MapFrom(src => src.HealthCareProviderMedicalCenter.HealthCareProvider.ApplicationUser.LastName))
                .ForMember(dest => dest.MedicalCenterName, opt => opt.MapFrom(src => src.HealthCareProviderMedicalCenter.MedicalCenter.Name))
                .ForMember(dest => dest.PathologyDescription, opt => opt.MapFrom(src => src.Pathology.Description));
        }
    }
}
