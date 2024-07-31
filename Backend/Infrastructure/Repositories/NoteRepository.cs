using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Note;
using DTOs.Patient;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories
{
    public class NoteRepository : GenericRepository<Note>, INoteRepository
    {
        private readonly IMapper _mapper;

        public NoteRepository(IMapper mapper, JustinaDbContext context) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<List<NoteGetDto>> GetAllNotes(Guid patientId)
        {
            return await _dbContext.Notes
                .Where(n => n.PatientId == patientId)
                .ProjectTo<NoteGetDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<bool> DeleteNote(Guid noteId, Guid patientId)
        {
            var dbNote = await _dbContext.Notes.FirstOrDefaultAsync(n => n.Id == noteId && n.PatientId == patientId);
            var result = DeleteAsync(dbNote);

            return result;
        }

        public async Task<NoteGetDto?> GetNoteById(Guid noteId, Guid patientId)
        {
            return await _dbContext.Notes
                .Where(x => x.Id == noteId && x.PatientId == patientId)
                .ProjectTo<NoteGetDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync();
        }
    }
}
