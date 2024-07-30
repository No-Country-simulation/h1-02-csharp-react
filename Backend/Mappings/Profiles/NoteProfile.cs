using AutoMapper;
using Domain.Entities;
using DTOs.Note;

namespace Mappings.Profiles
{
    public class NoteProfile : Profile
    {
        public NoteProfile()
        {
            CreateMap<NoteAddDto, Note>().ReverseMap();
            CreateMap<Note, NoteGetDto>();
        }
    }
}
