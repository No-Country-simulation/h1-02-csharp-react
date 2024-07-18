using AutoMapper;
using Domain.Entities;
using DTOs.Authentication;

namespace Mappings.Profiles.Authentication;

public class AuthenticationProfile : Profile
{
    public AuthenticationProfile()
    {
        CreateMap<ApplicationUser, AuthenticatedUserReponse>();

        //CreateMap<ApplicationUser, AuthenticatedUserReponse>().ReverseMap()
        //    .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
        //    .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));
    }
}
