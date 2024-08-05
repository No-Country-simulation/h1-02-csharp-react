using AutoMapper;
using Domain.Entities;
using DTOs.Allergy;

namespace Mappings.Profiles
{
    public class AllergyProfile : Profile
    {
        public AllergyProfile()
        {
            CreateMap<Allergy, AllergyGetDto>();
            CreateMap<AllergyUpdateDto, Allergy>();
        }
    }
}
