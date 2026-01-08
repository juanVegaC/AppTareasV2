using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Filters;
using API.DTOs.Puesto;
using API.DTOs.Puesto.PuestoCreate;
using API.DTOs.Puesto.PuestoEdit;
using API.DTOs.Puesto.PuestosGetAll;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPuestoRepository
    {
        Task<CreatePuestoResDto> Add(CreatePuestoDto puesto);
        void Delete(DeletePuestoDto puesto);
        Task<PuestoEditResDto> Update(PuestoEditReqDto puesto);

        Task<List<Puesto>> GetPuestosAsync(UserParams userParams,string filter);
        Task<List<PuestosGetAllResDto>> GetPuestosAllAsync(PuestosGetAllReqDto param);
        Task<List<PuestoPorUsuarioDto>> GetPuestosPorUsuarioAsync(PuestosGetParamsDto reqParams);
        Task<List<PuestoPorUsuarioDto>> GetPuestosPCreaTareaAsync(PuestosGetParamsDto reqParams);
        Task<List<PuestoPorUsuarioDto>> GetPuestosPAsignaTareaAsync(PuestosGetParamsDto reqParams);
        Task<List<PuestoPorUsuarioDto>> GetPuestosPRegresarTareaAsync(PuestosGetParamsDto reqParams);
        Task<List<PuestoPorUsuarioDto>> GetPuestosParaTareaAsync(int usuarioId, int tareaId);

        
    }
}