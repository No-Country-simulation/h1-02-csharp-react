using DTOs.Note;
using DTOs;

namespace Application.Contracts.Services
{
    public interface INoteService
    {
        Task<ServiceResponse<bool>> AddNote(NoteAddDto note, Guid patientId);
        Task<ServiceResponse<List<NoteGetDto>>> GetAllNotes(Guid patientId);
        Task<ServiceResponse<NoteGetDto>> GetNoteById(Guid noteId, Guid patientId);
        Task<ServiceResponse<bool>> EditNote(Guid noteId, Guid patientId, NoteUpdateDto updatedNote);
        Task<ServiceResponse<bool>> DeleteNote(Guid noteId, Guid patientId);
    }
}
