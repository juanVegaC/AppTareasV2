using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Empleado;
using API.DTOs.Empleado.EmpleadoCreate;
using API.DTOs.Empleado.EmpleadoEdit;
using API.DTOs.Empleado.EmpleadosGet;

namespace API.Interfaces
{
    public interface IEmpleadoRepository
    {
        Task<CreateEmpleadoResDto> Add(CreateEmpleadoDto empleado);
        Task<EmpleadoEditResDto> Update(EmpleadoEditReqDto empleado);


        Task<List<EmpleadosGetAllResDto>> GetEmpleadosAllAsync(EmpleadosGetAllReqDto param);

    }
}