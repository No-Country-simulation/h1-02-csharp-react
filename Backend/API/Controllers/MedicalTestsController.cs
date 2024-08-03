using Application.Contracts.AWS;
using Application.Contracts.Services;
using AutoMapper;
using DTOs.MedicalTest;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MedicalTestsController : ControllerBase
{
    private readonly IMedicalTestService _medicalTestService;
    private readonly IPatientService _patientService;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;

    public MedicalTestsController(
        IMedicalTestService medicalTestService,
        IFileService fileService,
        IMapper mapper,
        IPatientService patientService)
    {
        _medicalTestService = medicalTestService;
        _fileService = fileService;
        _mapper = mapper;
        _patientService = patientService;
    }

    [HttpPost("{patientId}", Name = "AddMedicalTestsFilesMedicalCenter")]
    [Authorize(Roles = "MedicalCenter")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddMedicalFilesMedicalCenter(Guid patientId, IFormFile file)
    {
        var serviceResponseFile = await _fileService.UploadFileMedicalRecordAsync(file, patientId.ToString());

        if (!serviceResponseFile.Success)
        {
            if (serviceResponseFile.Message.Contains("AWS service error"))
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable, serviceResponseFile.Message);
            }
            else if (serviceResponseFile.Message.Contains("AWS client error"))
            {
                return BadRequest(serviceResponseFile.Message);
            }
            else if (serviceResponseFile.Message.Contains("File I/O error"))
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, serviceResponseFile.Message);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, serviceResponseFile.Message);
            }
        }

        var medicalTestToAdd = new CreateMedicalTestDto
        {
            FileUrl = serviceResponseFile.Data,
            PatientId = patientId,
            TestDate = DateTime.Now,
            TestName = file.FileName
        };

        var response = await _medicalTestService.AddMedicalTestAsync(medicalTestToAdd);
        if (!response.Success)
        {
            if (response.ValidationErrors != null && response.ValidationErrors.Count > 0)
            {
                return BadRequest(new
                {
                    message = "Validation errors occurred.",
                    errors = response.ValidationErrors
                });
            }

            return StatusCode(500, new { message = response.Message });
        }

        return Ok(response.Data);
    }

    [HttpPost(Name = "AddMedicalTestsFilesPatient")]
    [Authorize(Roles = "Patient")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddMedicalFilesPatient(IFormFile file)
    {
        var userId = User.FindFirstValue("uid");
        var userGuid = new Guid(userId);

        var patientId = await _patientService.GetPatientIdByUserId(userGuid);
        if (!patientId.Success)
        {
            return NotFound();
        }

        var serviceResponse = await _fileService.UploadFileMedicalRecordAsync(file, patientId.Data.ToString());

        if (!serviceResponse.Success)
        {
            if (serviceResponse.Message.Contains("AWS service error"))
            {
                return StatusCode((int)HttpStatusCode.ServiceUnavailable, serviceResponse.Message);
            }
            else if (serviceResponse.Message.Contains("AWS client error"))
            {
                return BadRequest(serviceResponse.Message);
            }
            else if (serviceResponse.Message.Contains("File I/O error"))
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, serviceResponse.Message);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, serviceResponse.Message);
            }
        }

        var medicalTestToAdd = new CreateMedicalTestDto
        {
            FileUrl = serviceResponse.Data,
            PatientId = patientId.Data,
            TestDate = DateTime.Now,
            TestName = file.FileName
        };

        var response = await _medicalTestService.AddMedicalTestAsync(medicalTestToAdd);
        if (!response.Success)
        {
            if (response.ValidationErrors != null && response.ValidationErrors.Count > 0)
            {
                return BadRequest(new
                {
                    message = "Validation errors occurred.",
                    errors = response.ValidationErrors
                });
            }

            return StatusCode(500, new { message = response.Message });
        }

        return Ok(response);
    }

    [HttpGet("GetAllByMedicalCenter")]
    [Authorize(Roles = "MedicalCenter")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetAllMedicalTests()
    {
        var response = await _medicalTestService.GetAllMedicalTests();

        if (!response.Success)
        {
            return NotFound();
        }
        return Ok(response);
    }

    [HttpGet("GetAllByPatient")]
    [Authorize(Roles = "Patient")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetAllMedicalTestsByPatient()
    {
        var userId = User.FindFirstValue("uid");
        var userGuid = new Guid(userId);

        var patientId = await _patientService.GetPatientIdByUserId(userGuid);
        if (!patientId.Success)
        {
            return NotFound();
        }

        var response = await _medicalTestService.GetMedicalTestsByPatientId(patientId.Data);

        if (!response.Success)
        {
            return NotFound();
        }
        return Ok(response);
    }


    [HttpGet("GetAllByHealthCareProvider/{patientId}")]
    [Authorize(Roles = "HealthCareProvider")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetMedicalTestsByHealthCareProvider(Guid patientId)
    {
        var response = await _medicalTestService.GetMedicalTestsByPatientId(patientId);

        if (!response.Success)
        {
            return NotFound();
        }
        return Ok(response);
    }
}
