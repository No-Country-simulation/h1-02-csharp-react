using Application.Contracts.Persistence;
using Domain.Entities;
using Persistence.Data;

namespace Persistence.Repositories
{
    public class PatientRepository : GenericRepository<Patient>, IPatientRepository
    {
        public PatientRepository(JustinaDbContext dbContext) : base(dbContext)
        {
            
        }
    }
}
