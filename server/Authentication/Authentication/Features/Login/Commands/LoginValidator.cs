using FluentValidation;

namespace Authentication.Features.Login.Commands
{
    public class LoginValidator : AbstractValidator<LoginCommand>
    {
        public LoginValidator()
        {
            RuleFor(client => client.Email).NotEmpty()
                .Matches("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/").WithMessage("Invalid email.");
            
            RuleFor(client => client.Password).NotEmpty()
                   .Matches("/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/").WithMessage("Invalid password.");
        }
    }
}
