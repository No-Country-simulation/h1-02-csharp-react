using DTOs;
using DTOs.Speciality;
using Domain.Entities;

namespace Application.Contracts.Services;

public interface ISpecialityService
{
    Task<ServiceResponse<GetSpecialityDto>> GetSpecialityById(Guid id);
    Task<ServiceResponse<List<GetSpecialitiesDto>>> GetAllSpecialities();
    Task<ServiceResponse<GetSpecialitiesDto>> AddSpecialityAsync(AddSpecialityDto speciality);
    Task<ServiceResponse<bool>> UpdateSpeciality(Guid id, UpdateSpecialityDto updateRequest);
}
