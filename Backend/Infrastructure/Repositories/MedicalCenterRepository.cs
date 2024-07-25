using Application.Contracts.Persistence;
using Domain.Entities;
using Persistence.Data;

namespace Persistence.Repositories;

public class MedicalCenterRepository : GenericRepository<MedicalCenter>, IMedicalCenterRepository
{
    public MedicalCenterRepository(JustinaDbContext dbContext) : base(dbContext)
    {
    }

}
