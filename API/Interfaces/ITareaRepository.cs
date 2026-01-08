using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Filters;
using API.DTOs.Tarea;
using API.DTOs.Tarea.TareaDelete;
using API.DTOs.TareasPuestoTab.TareasPuestoTabGet;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTAsigFromPool;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTAsigna;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTMoveEdo;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ITareaRepository
    {
        Task<CreateTareaResDto> AddTarea(CreateTareaDto tarea);
        Task<DeleteTareaResDto> DeleteTarea(DeleteTareaDto tarea);
        Task<AsignaTareaResDto> AsignaTarea(AsignaTareaDto tarea);
        Task<TareasPTMoveEdoResDto> MoveTareaEstado(TareasPTMoveEdoReqDto tarea);
        Task<TareasPTAsignaResDto> TableroAsigna(TareasPTAsignaReqDto tarea);
        Task<DesAsignaTareaResDto> DesasignaTarea(DesAsignaTareaDto tarea);
        Task<TareaEditResDto> UpdateTarea(TareaEditReqDto tarea);
        Task<UpdateTareaPrioResDto> UpdateTareaPrioridad(UpdateTareaPriorDto tarea);

        Task<List<STareasPorPuestoDto>> GetTareasPorPuestoAsync(UserParams userParams,FilterTareasDto filter);
        Task<List<TareasPuestoTabGetResDto>> GetTareasPuestoTabAsync(TareasPuestoTabGetReqDto filter);

        Task<List<STareasPorPuestoDto>> GetPrioridadesPorPuestoAsync(UserParams userParams,FilterTareasDto filter);

    }
}