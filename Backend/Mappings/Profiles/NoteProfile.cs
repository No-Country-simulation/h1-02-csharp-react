using AutoMapper;
using Domain.Entities;
using DTOs.Note;

namespace Mappings.Profiles
{
    public class NoteProfile : Profile
    {
        public NoteProfile()
        {
            CreateMap<NoteAddDto, Note>();
            CreateMap<NoteUpdateDto, Note>().ReverseMap();
            CreateMap<Note, NoteGetDto>();
        }
    }
}
