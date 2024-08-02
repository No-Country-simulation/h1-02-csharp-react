using Application.Contracts.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrugController : ControllerBase
    {
        private readonly IDrugService _drugService;

        public DrugController(IDrugService drugService)
        {
            _drugService = drugService;
        }

        [HttpGet("GetAllDrugs")]
        public async Task<ActionResult> GetAllDrugs()
        {
            return Ok(await _drugService.GetAllDrugs());
        }

    }
}
