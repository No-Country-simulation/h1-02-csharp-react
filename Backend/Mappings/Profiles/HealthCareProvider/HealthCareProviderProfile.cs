using AutoMapper;
using Domain.Entities;
using DTOs.HealthCareProvider;

namespace Mappings.Profiles
{
    public class HealthCareProviderProfile : Profile
    {
        public HealthCareProviderProfile()
        {
            CreateMap<HealthCareProvider, HealthCareProviderUpdateDto>();
        }
    }
}
