using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Actividad;
using API.DTOs.Actividad.ActividadPorAsigGet;

namespace API.Interfaces
{
    public interface IActividadRepository
    {
        Task<CreateActividadResDto> Add(CreateActividadDto actividad);
        Task<List<ActividadPorAsigGetResDto>> GetActividadPorAsigAsync(ActividadPorAsigGetReqDto filter);

    }
}