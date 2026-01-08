using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.Empleado;
using API.DTOs.Empleado.EmpleadoCreate;
using API.DTOs.Empleado.EmpleadoEdit;
using API.DTOs.Empleado.EmpleadosGet;
using API.Extensions;
using API.Interfaces;
using API.UseCases.Empleados;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
     //[Authorize]
    public class EmpleadosController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public EmpleadosController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }
 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetEmpleados(string parameters)
        {

            var reqParams = JsonSerializer.Deserialize<EmpleadosGetParamsDto>(parameters);

            reqParams.usuarioId = User.GetUserId();

            if (reqParams.ctrl_app_action == "EMPLEADOS_ALL"){
                var empleadoGetAllReq = new EmpleadosGetAllReqDto();
                empleadoGetAllReq.usuarioId =  User.GetUserId();
                var empleados = await _unitOfWork.EmpleadoRepository.GetEmpleadosAllAsync(empleadoGetAllReq);
                return Ok(empleados);
            }else{
                return BadRequest("NO UseCase FOUND!!");
            }

        }

        [HttpPost]
        public async Task<ActionResult<CreateEmpleadoResDto>> Create(CreateEmpleadoDto createEmpleadoDto){


          var createEmpleado_UC = new CreateEmpleado_UC(_unitOfWork,_mapper);

          createEmpleadoDto.creadoPor = User.GetUserId();
          //createEmpleadoDto.creadoPor = 2;

          var newEmpleadoDto = await createEmpleado_UC.Create(createEmpleadoDto);

/*             
          newUserDto.messages = result_messages;     
 */         
          return newEmpleadoDto;
        }

        [HttpPut]
        public async Task<ActionResult<EmpleadoEditResDto>> Update(EmpleadoEditReqDto  empleadoDto){

            var updateEmpleado = new UpdateEmpleado_UC(_unitOfWork,_mapper);

            empleadoDto.modifPor = User.GetUserId();

            var result = await updateEmpleado.Update(empleadoDto);

            return result;

        }        
    
        
    }
}