using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.MedicalTest;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories;

public class MedicalTestRepository : GenericRepository<MedicalTest>, IMedicalTestRepository
{
    private readonly IMapper _mapper;

    public MedicalTestRepository(JustinaDbContext dbContext, IMapper mapper) : base(dbContext)
    {
        _mapper = mapper;
    }
    //public MedicalTestRepository(JustinaDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
    //{
    //}

    public async Task<List<GetMedicalTestDto>> GetAllMedicalTestsByPatientId(Guid patientId)
    {
        var medicalTests = await _dbContext.MedicalTests
            .Where(mt => mt.PatientId == patientId)
            .ProjectTo<GetMedicalTestDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return medicalTests;
    }

}