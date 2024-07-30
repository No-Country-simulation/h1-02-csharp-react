using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Note;
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
    }
}
