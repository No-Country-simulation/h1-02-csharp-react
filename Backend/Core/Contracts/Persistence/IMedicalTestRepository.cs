using Domain.Entities;
using DTOs.MedicalTest;

namespace Application.Contracts.Persistence;

public interface IMedicalTestRepository : IGenericRepository<MedicalTest>
{
    Task<List<GetMedicalTestDto>> GetAllMedicalTestsByPatientId(Guid patientId);
}