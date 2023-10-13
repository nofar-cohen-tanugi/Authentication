﻿using Authentication.Data;
using Authentication.Entities;
using Authentication.Profiles;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

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

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
       .AddCookie(options =>
       {
           options.LoginPath = "/App/Authenticate";
           options.Cookie.HttpOnly = true; // security
           options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Enable this in a production environment (requires HTTPS)
       });

            services.AddHttpContextAccessor();

            /* services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
     .AddJwtBearer(options =>
     {
         options.TokenValidationParameters = new TokenValidationParameters
         {
             ValidateIssuer = true,
             ValidateAudience = true,
             ValidateLifetime = true,
             ValidateIssuerSigningKey = true,
             ValidIssuer = "your_issuer",
             ValidAudience = "your_audience",
             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key"))
         };
     });*/

            return services;
        }
    }
}
