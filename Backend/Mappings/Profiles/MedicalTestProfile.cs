using AutoMapper;
using Domain.Entities;
using DTOs.MedicalTest;

namespace Mappings.Profiles;

public class MedicalTestProfile : Profile
{
    public MedicalTestProfile()
    {
        CreateMap<AddMedicalTestDto, CreateMedicalTestDto>();

        CreateMap<CreateMedicalTestDto, MedicalTest>();

        CreateMap<MedicalTest, GetMedicalTestDto>();
    }
}
