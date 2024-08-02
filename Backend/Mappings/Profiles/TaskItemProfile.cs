using AutoMapper;
using Domain.Entities;
using DTOs.TaskItem;

namespace Mappings.Profiles
{
    public class TaskItemProfile : Profile
    {
        public TaskItemProfile()
        {
            CreateMap<TaskItemAddDto, TaskItem>();
            CreateMap<TaskItem, TaskItemGetDto>();
            CreateMap<TaskItemUpdateDto, TaskItem>().ReverseMap();
        }
    }
}
