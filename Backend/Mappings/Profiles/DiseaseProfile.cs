using AutoMapper;
using Domain.Entities;
using DTOs.Disease;

namespace Mappings.Profiles
{
    public class DiseaseProfile : Profile
    {
        public DiseaseProfile()
        {
            CreateMap<Disease, DiseaseGetDto>();
        }
    }
}
