using AutoMapper;
using Domain.Entities;
using DTOs.Drug;

namespace Mappings.Profiles
{
    public class DrugProfile : Profile
    {
        public DrugProfile()
        {
            CreateMap<Drug, DrugGetDto>();
        }
    }
}
