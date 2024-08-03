using Application.Contracts.Persistence;
using Application.Contracts.Services;
using AutoMapper;
using DTOs;
using DTOs.Disease;
using DTOs.Pathology;
using Microsoft.Extensions.Logging;

namespace Application.Services;

public class PathologyService : IPathologyService
{
    private readonly IPathologyRepository _pathologyRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<DiseaseService> _logger;

    public PathologyService(
        IPathologyRepository pathologyRepository, 
        IMapper mapper, 
        ILogger<DiseaseService> logger)
    {
        _pathologyRepository = pathologyRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<ServiceResponse<List<GetPathologiesDto>>> GetAllPathologies()
    {
        var serviceResponse = new ServiceResponse<List<GetPathologiesDto>>();

        try
        {
            serviceResponse.Data = await _pathologyRepository.GetAllPathologies();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
            _logger.LogError(ex.Message);
        }

        return serviceResponse;
    }
}
