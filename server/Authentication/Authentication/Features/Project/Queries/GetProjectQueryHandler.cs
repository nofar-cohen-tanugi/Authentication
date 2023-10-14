using AutoMapper;
using MediatR;
using Authentication.Dto;
using System.Linq.Expressions;
using Authentication.Data;
using Authentication.Features.Project.Queries;
using Authentication.Entities;
using System.Linq.Dynamic.Core;


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

            if (!string.IsNullOrEmpty(request.Id))
            {
                predicate = predicate.And(x => x.Id.Contains(request.Id));
            }
            if (!string.IsNullOrEmpty(request.Name))
            {
                predicate = predicate.And(x => x.Name.Contains(request.Name));
            }
            if (!string.IsNullOrEmpty(request.DurationInDays))
            {
                predicate = predicate.And(x => x.DurationInDays == int.Parse(request.DurationInDays));

            }
            if (!string.IsNullOrEmpty(request.BugsCount))
            {
                predicate = predicate.And(x => x.BugsCount == int.Parse(request.BugsCount));
            }
            if (request.MadeDadeline != null)
            {
                predicate = predicate.And(x => x.MadeDadeline == request.MadeDadeline);
            }

            int page = Convert.ToInt32(request.Page);
            int size = Convert.ToInt32(request.Size);

            var query = _context.Project
                .Where(predicate);

            if (request.OrderBy is not null)
            {
                if (request.IsAscending == true)
                    query = query.OrderBy(request.OrderBy);

                else
                {
                    query = query.OrderBy(request.OrderBy + " descending");
                }
            }


            var result = await query
                .Skip(page * size)
                .Take(size)
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
