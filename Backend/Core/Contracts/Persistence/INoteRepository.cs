using Domain.Entities;
using DTOs.Note;

namespace Application.Contracts.Persistence
{
    public interface INoteRepository : IGenericRepository<Note>
    {
        public Task<List<NoteGetDto>> GetAllNotes(Guid patientId);
        Task<bool> DeleteNote(Guid noteId, Guid patientId);
        Task<NoteGetDto?> GetNoteById(Guid noteId, Guid patientId);
    }
}
