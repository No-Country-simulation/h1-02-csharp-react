using AutoMapper;
using Domain.Entities;
using DTOs.Pathology;

namespace Mappings.Profiles;

public class PathologyProfile : Profile
{
    public PathologyProfile()
    {
        CreateMap<Pathology, GetPathologiesDto>();
    }
}
