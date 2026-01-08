using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Asignacion;
using API.DTOs.Asignacion.AsignacionClose;
using API.DTOs.Asignaciones;

namespace API.Interfaces
{
    public interface IAsignacionesRepository
    {
        Task<List<AsignacionesPorTareaResDto>> GetAsignacionesDeTareaAsync(AsignacionesPorTareaReqDto reqParams); 
        Task<AsignacionUpdPriorResDto> UpdatePrioridades(UpdateAsignacionDto asignacion);       
        Task<AsignacionCloseDtoRes> Close(UpdateAsignacionDto asignacion);       
    }
}