using DTOs.Note;
using DTOs;

namespace Application.Contracts.Services
{
    public interface INoteService
    {
        Task<ServiceResponse<bool>> AddNote(NoteAddDto note, Guid patientId);
        Task<ServiceResponse<List<NoteGetDto>>> GetAllNotes(Guid patientId);
        Task<ServiceResponse<bool>> EditNote(Guid patientId, Guid noteId, NoteAddDto updatedNote);
    }
}
