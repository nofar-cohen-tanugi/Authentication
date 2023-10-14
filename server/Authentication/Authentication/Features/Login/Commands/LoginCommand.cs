using MediatR;
using Authentication.Dto;

namespace Authentication.Features.Login.Commands
{
    public class LoginCommand : IRequest<LoginDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
