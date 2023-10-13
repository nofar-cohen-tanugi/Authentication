using AutoMapper;
using MediatR;
using Authentication.Data;
using Authentication.Dto;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;

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
            var user = await _context.User.Where(x => x.Email == request.Email && x.Password == request.Password).FirstOrDefaultAsync();

            if (user == null)
            {
                throw new HttpRequestException("User not found");
            }

            // Generate a secure key with a sufficient size
            var key = new byte[32]; // 256 bits
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(key);
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
             new Claim(ClaimTypes.Email, user.Email),
    }           ),
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            if (String.IsNullOrEmpty(tokenString))
            {
                throw new HttpRequestException("Can't create token");
            }

            // personal details
            var result = new BaseResponseDto<LoginDto>();

            var details = _context.PersonalDetails
               .Where(x => x.UserId == user.Id)
               .FirstOrDefault();

            if (details == null)
            {
                throw new HttpRequestException("User details not found");

            }


            return new BaseResponseDto<LoginDto>
            {
                Data = new LoginDto
                {
                    Token = tokenString,
                    PersonalDetails = _mapper.Map<PersonalDetailsDto>(details)
                },
                TotalCount = 1,
                IsSuccess = true
            };
        }

    }
}
