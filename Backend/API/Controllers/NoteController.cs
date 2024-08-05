using Application.Contracts.Services;
using DTOs;
using DTOs.Note;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Utilities.Enums;

namespace API.Controllers
{
    [Authorize(Roles = nameof(AccountType.Patient))]
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteService _noteService;
        private readonly IPatientService _patientService;

        public NoteController(INoteService noteService, IPatientService patientService)
        {
            _noteService = noteService;
            _patientService = patientService;
        }

        private async Task<Guid> GetCurrentPatient()
        {
            var userId = User.FindFirstValue("uid");
            var userGuid = new Guid(userId);

            var patientId = await _patientService.GetPatientIdByUserId(userGuid);

            return patientId.Data;
        }

        [HttpPost("AddNote")]
        public async Task<ActionResult<ServiceResponse<bool>>> AddNote(NoteAddDto note)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _noteService.AddNote(note, patientId));
        }

        [HttpGet("GetAllNotes")]
        public async Task<ActionResult<ServiceResponse<List<NoteGetDto>>>> GetAllNotes()
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _noteService.GetAllNotes(patientId));
        }

        [HttpGet("GetNoteById/{noteId}")]
        public async Task<ActionResult> GetNoteById(Guid noteId)
        {
            var patientId = await GetCurrentPatient();

            var result = await _noteService.GetNoteById(noteId, patientId);

            if (result != null)
            {
                return Ok(result);
            }
            return NotFound($"Note with Id {noteId} was not found.");
        }

        [HttpPut("EditNote/{noteId}")]
        public async Task<ActionResult<ServiceResponse<bool>>> EditNote(Guid noteId, NoteUpdateDto updatedNote)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _noteService.EditNote(noteId, patientId, updatedNote));
        }

        [HttpDelete("DeleteNote/{noteId}")]
        public async Task<ActionResult<bool>> DeleteNote(Guid noteId)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _noteService.DeleteNote(noteId, patientId));
        }
    }
}
