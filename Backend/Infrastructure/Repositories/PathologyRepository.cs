using Application.Contracts.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using DTOs.Pathology;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Persistence.Repositories;

public class PathologyRepository : GenericRepository<Pathology>, IPathologyRepository
{
    private readonly IMapper _mapper;

    public PathologyRepository(IMapper mapper, JustinaDbContext context) : base(context)
    {
        _mapper = mapper;
    }

    public async Task<List<GetPathologiesDto>> GetAllPathologies()
    {
        var pathologies = await _dbContext.Pathologies
            .ProjectTo<GetPathologiesDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

        return pathologies;
    }
}
