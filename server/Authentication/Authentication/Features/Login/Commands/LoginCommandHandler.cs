using AutoMapper;
using MediatR;
using Authentication.Data;
using Authentication.Dto;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Authentication.Features.Login.Commands
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, BaseResponseDto<LoginDto>>
    {
        private DataContext _context;
        private IMapper _mapper;

        public LoginCommandHandler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        protected LoginValidator Validator => new LoginValidator();

        public async Task<BaseResponseDto<LoginDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var result = new BaseResponseDto<LoginDto>();

            var user = await _context.User.Where(x => x.Email == request.Email).FirstOrDefaultAsync();

            if (user == null)
            {
                throw new HttpRequestException("User not found");
            }

            var details = _context.PersonalDetails
               .Where(x => x.UserId == user.Id)
               .FirstOrDefault();

            if (details == null)
            {
                throw new HttpRequestException("User details not found");

            }
            return new BaseResponseDto<LoginDto>
            {
                Data = _mapper.Map<LoginDto>(details),
                TotalCount = 1,
                IsSuccess = true
            };
        }

    }
}
