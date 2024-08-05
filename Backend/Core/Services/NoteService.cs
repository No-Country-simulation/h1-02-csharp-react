using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using Domain.Entities;
using DTOs;
using DTOs.Note;
using Microsoft.Extensions.Logging;

namespace Application.Services
{
    public class NoteService : INoteService
    {
        private readonly INoteRepository _noteRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<NoteService> _logger;

        public NoteService(INoteRepository noteRepository, IMapper mapper, ILogger<NoteService> logger)
        {
            _noteRepository = noteRepository;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ServiceResponse<bool>> AddNote(NoteAddDto note, Guid patientId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var newNote = _mapper.Map<Note>(note);
                newNote.PatientId = patientId;
                await _noteRepository.AddAsync(newNote);
                await _noteRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "New note added successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<NoteGetDto>>> GetAllNotes(Guid patientId)
        {
            var serviceResponse = new ServiceResponse<List<NoteGetDto>>();

            try
            {
                serviceResponse.Data = await _noteRepository.GetAllNotes(patientId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<NoteGetDto>> GetNoteById(Guid noteId, Guid patientId)
        {
            var serviceResponse = new ServiceResponse<NoteGetDto>();
            try
            {
                serviceResponse.Data = await _noteRepository.GetNoteById(noteId, patientId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, $"{ex.Message}");
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> EditNote(Guid noteId, Guid patientId, NoteUpdateDto updatedNote)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var dbNote = await _noteRepository.GetByIdAsync(noteId);
                if (dbNote == null || dbNote.PatientId != patientId)
                {
                    throw new Exception($"Note with Id '{noteId}' was not found.");
                }

                _mapper.Map(updatedNote, dbNote);
                await _noteRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Note edited successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DeleteNote(Guid noteId, Guid patientId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                if (await _noteRepository.DeleteNote(noteId, patientId))
                    await _noteRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Note deleted successfully";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex.Message);
            }

            return serviceResponse;
        }
    }
}
