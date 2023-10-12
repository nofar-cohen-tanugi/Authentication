using Authentication.Profiles;
using AutoMapper;
using MediatR;
using Authentication.Entities;
using System.Reflection;

namespace Authentication.Services
{
    public static class AppService
    {
        public static IServiceCollection AppServiceMediator(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", builder =>
                {
                    builder.WithOrigins("http://127.0.0.1:5173")
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddMediatR(Assembly.GetExecutingAssembly());
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });


            return services;
        }
    }
}
