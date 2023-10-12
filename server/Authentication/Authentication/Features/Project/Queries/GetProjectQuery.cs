using MediatR;
using Authentication.Dto;

namespace Authentication.Features.Project.Queries
{
    public class GetProjectQuery : IRequest<BaseResponseDto<IReadOnlyList<ProjectDto>>>
    {
        public int Page { get; set; }
        public int Size { get; set; }
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Score { get; set; }
        public string? DurationInDays { get; set; }
        public string? BugsCount { get; set; }
        public bool? MadeDadeline { get; set; }


    }
}
