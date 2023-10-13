using MediatR;
using Microsoft.AspNetCore.Mvc;
using Authentication.Data;
using Authentication.Dto;
using Authentication.Features.Project.Queries;
using Authentication.Features.Login.Commands;

namespace NessOrtClients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfoController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMediator _mediator;

        public InfoController(DataContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        [HttpGet("info", Name = "info")]
        public async Task<ActionResult<BaseResponseDto<ProjectDto>>> GetProjects(int? page = 0, int? size = 10,
         string? filterId = null,
         string? filterName = null,
         string? filterScore = null,
         string? filterDurationInDays = null,
         string? filterBugsCount = null,
         bool? filterMadeDadeline = null)
        {
            var response = await _mediator.Send(new GetProjectQuery
            {
                Page = page,
                Size = size,
                Id = filterId,
                Name = filterName,
                Score = filterScore,
                DurationInDays = filterDurationInDays,
                BugsCount = filterBugsCount,
                MadeDadeline = filterMadeDadeline
            });
       
            return Ok(response);
        }

        [HttpPost("Authenticate", Name = "Authenticate")]
        public async Task<ActionResult<LoginDto>> Login([FromBody] LoginCommand command)
        {
            var response = await _mediator.Send(command);
            return Ok(response);
        }
    }
}
