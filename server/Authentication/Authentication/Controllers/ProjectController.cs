using MediatR;
using Microsoft.AspNetCore.Mvc;
using Authentication.Data;
using Authentication.Dto;
using System.Drawing;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using Authentication.Features.Project.Queries;

namespace NessOrtClients.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMediator _mediator;

        public ProjectController(DataContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponseDto<ProjectDto>>> GetClients(int page, int size,
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
    }
}
