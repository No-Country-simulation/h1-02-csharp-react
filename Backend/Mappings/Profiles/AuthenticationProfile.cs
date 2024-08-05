using AutoMapper;
using Domain.Entities;
using DTOs.Authentication;

namespace Mappings.Profiles;

public class AuthenticationProfile : Profile
{
    public AuthenticationProfile()
    {
        CreateMap<ApplicationUser, AuthenticatedUserReponse>();

        CreateMap<RegistrationUserCentersRequest, ApplicationUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.EmailConfirmed, opt => opt.MapFrom(src => true));

        CreateMap<RegistrationUserRequest, ApplicationUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.EmailConfirmed, opt => opt.MapFrom(src => true));

    }
}
