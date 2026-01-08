using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;
using System.Xml.Linq;
using API.DTOs;
using API.DTOs.Actividad;
using API.DTOs.Actividad.ActividadPorAsigGet;
using API.DTOs.Asignacion;
using API.DTOs.Asignacion.AsignacionClose;
using API.DTOs.Tarea;
using API.DTOs.User;
using API.DTOs.User.UserCreate;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, AppUser>();
            CreateMap<UserCreateReqDto, AppUser>();
            CreateMap<MemberDto, AppUser>();
            CreateMap<AppUser, MemberDto>();
            CreateMap<UpdateTareaDto, DeleteTareaDto>();
            CreateMap<UpdateTareaDto, AsignaTareaDto>();
            CreateMap<UpdateTareaDto, DesAsignaTareaDto>();
            CreateMap<UpdateTareaDto, TareaEditReqDto>();
            CreateMap<UpdateTareaDto, UpdateTareaPriorDto>();
            CreateMap<AsignacionesGetParamsDto, AsignacionesPorTareaReqDto>();
            CreateMap<AppUserEditParamsDto, AppUserUpdateReqDto>();
            CreateMap<ActividadGetParamsDto, ActividadPorAsigGetReqDto>();

 

/*              CreateMap<JToken, DbMsgResult>()
                        .ForMember("type", cfg => { cfg.MapFrom(jo => jo["type"]); })
                        .ForMember("txt", cfg => { cfg.MapFrom(jo => jo["description"]); });
              */
        }
    }
}