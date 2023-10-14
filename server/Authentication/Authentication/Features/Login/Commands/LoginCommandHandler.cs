using Authentication.Data;
using Authentication.Dto;
using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Authentication.Features.Login.Commands
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginDto>
    {
        private DataContext _context;
        private IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public LoginCommandHandler(DataContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        protected LoginValidator Validator = new LoginValidator();

        public async Task<LoginDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var validationResult = Validator.Validate(request);

            if (!validationResult.IsValid)
            {
                // Handle validation errors (e.g., return validation errors to the client)
                // You can access validation errors from validationResult.Errors
                throw new ValidationException(validationResult.Errors);
            }

            var user = await _context.User
                .Where(x => x.Email == request.Email && x.Password == request.Password)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new HttpRequestException("User not found");
            }

            // Authenticate the user and generate a token (e.g., JWT)
            string token = GenerateToken(request.Email);

            if (string.IsNullOrEmpty(token))
            {
                throw new HttpRequestException("Can't create token");
            }

            // personal details
            var result = new LoginDto();

            var details = await _context.PersonalDetails
                .Where(x => x.UserId == user.Id)
                .FirstOrDefaultAsync();

            if (details == null)
            {
                throw new HttpRequestException("User details not found");
            }

            // Store the token in a cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Path = _httpContextAccessor?.HttpContext?.Request.Path,
                Domain = _httpContextAccessor?.HttpContext?.Request.Host.Host,
            Expires = DateTime.UtcNow.AddMinutes(60)
            };

            _httpContextAccessor?.HttpContext?.Response.Cookies.Append("authToken", token, cookieOptions);

            return new LoginDto
            {
                Token = token,
                PersonalDetails = _mapper.Map<PersonalDetailsDto>(details)
            };
        }

        private string GenerateToken(string email)
        {

            // Generate a secure key of at least 128 bits (16 bytes)
            var keyB = new byte[16]; // 16 bytes = 128 bits
            using (var rng = new System.Security.Cryptography.RNGCryptoServiceProvider())
            {
                rng.GetBytes(keyB);
            }

            var key = new SymmetricSecurityKey(keyB);
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: "your_issuer",
                audience: "your_audience",
                claims: claims,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
