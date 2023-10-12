using AutoMapper;
using Authentication.Dto;
using Authentication.Entities;

namespace Authentication.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<Project, ProjectDto>();

        }

    }
}
