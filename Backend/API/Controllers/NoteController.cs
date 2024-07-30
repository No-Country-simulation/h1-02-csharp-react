using Application.Contracts.Services;
using DTOs;
using DTOs.Note;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteService _noteService;
        private readonly IPatientService _petientService;

        public NoteController(INoteService noteService, IPatientService patientService)
        {
            _noteService = noteService;
            _petientService = patientService;
        }


        private async Task<Guid> GetCurrentPatient()
        {
            var userId = User.FindFirstValue("uid");
            var userGuid = new Guid(userId);

            var patientId = await _petientService.GetPatientIdByUserId(userGuid);

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

        [HttpPut("EditNote")]
        public async Task<ActionResult<ServiceResponse<bool>>> EditNote(Guid noteId, NoteAddDto updatedNote)
        {
            var patientId = await GetCurrentPatient();

            return Ok(await _noteService.EditNote(patientId, noteId, updatedNote));
        }
    }
}
