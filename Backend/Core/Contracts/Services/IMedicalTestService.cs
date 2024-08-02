using DTOs;
using DTOs.MedicalTest;

namespace Application.Contracts.Services;

public interface IMedicalTestService
{
    Task<ServiceResponse<GetMedicalTestDto>> AddMedicalTestAsync(CreateMedicalTestDto medicalTest);
    Task<ServiceResponse<List<GetMedicalTestDto>>> GetAllMedicalTests();
    Task<ServiceResponse<List<GetMedicalTestDto>>> GetMedicalTestsByPatientId(Guid patientId);
}