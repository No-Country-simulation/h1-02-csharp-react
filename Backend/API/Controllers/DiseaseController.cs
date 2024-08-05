using Application.Contracts.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiseaseController : ControllerBase
    {
        private readonly IDiseaseService _diseaseService;

        public DiseaseController(IDiseaseService diseaseService)
        {
            _diseaseService = diseaseService;
        }

        [HttpGet("GetAllDiseases")]
        public async Task<ActionResult> GetAllDiseases()
        {
            return Ok(await _diseaseService.GetAllDiseases());
        }

    }
}
