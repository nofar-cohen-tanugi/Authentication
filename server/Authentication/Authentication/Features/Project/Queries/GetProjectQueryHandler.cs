using Authentication.Data;
using Authentication.Dto;
using Authentication.Entities;
using Authentication.Features.Project.Queries;
using AutoMapper;
using MediatR;
using System.Linq.Expressions;

namespace NessOrtClients.Features.Client.Create.Queries
{
    public class GetClientQueryHandler : IRequestHandler<GetProjectQuery, BaseResponseDto<IReadOnlyList<ProjectDto>>>
    {
        private DataContext _context;
        private IMapper _mapper;

        public GetClientQueryHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BaseResponseDto<IReadOnlyList<ProjectDto>>> Handle(GetProjectQuery request, CancellationToken cancellationToken)
        {

            Expression<Func<Project, bool>> predicate = x => true;

          /*  if (!string.IsNullOrEmpty(request.Id))
            {
                predicate = predicate.And(x => x.Id.Contains(request.Id));
            }
            if (!string.IsNullOrEmpty(request.Name))
            {
                predicate = predicate.And(x => x.Name.Contains(request.Name));
            }
            if (!string.IsNullOrEmpty(request.DurationInDays))
            {
                predicate = predicate.And(x => x.DurationInDays == request.DurationInDays);

            }
            if (!string.IsNullOrEmpty(request.BugsCount))
            {
                predicate = predicate.And(x => x.BugsCount == request.BugsCount);
            }
            if (request.MadeDadeline != null)
            {
                predicate = predicate.And(x => x.MadeDadeline == request.MadeDadeline);
            }*/

            var result = await _context.Project
                .Where(predicate)
                .OrderByDescending(x => x.Name)
                .Skip(request.Page * request.Size)
                .Take(request.Size)
                .AsNoTracking()
                .ToListAsync();

            int count = _context.Project.Count();

            return new BaseResponseDto<IReadOnlyList<ProjectDto>>
            {
                Data = _mapper.Map<IReadOnlyList<ProjectDto>>(result),
                TotalCount = count,
                IsSuccess = true
            };
        }
    }
}
