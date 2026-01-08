using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Asignacion;
using API.Extensions;
using API.Interfaces;
using API.UseCases.Asignaciones;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AsignacionesController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public AsignacionesController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }
 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetAsignaciones(string parameters)
        {


            var reqParams = JsonSerializer.Deserialize<AsignacionesGetParamsDto>(parameters);

            reqParams.usuarioId = User.GetUserId();

            if (reqParams.ctrl_app_action == "ASIGNACIONES_D_TAREA"){
                var asigParam = JsonSerializer.Deserialize<AsignacionesPorTareaReqDto>(parameters);
                var asignaciones = await _unitOfWork.AsignacionesRepository.GetAsignacionesDeTareaAsync(asigParam);
                return Ok(asignaciones);
            }else{
                return BadRequest("NO UseCase FOUND!!");
            }



        }
        
        [HttpPut]
        public async Task<ActionResult<Object>> UpdateAsignaion(UpdateAsignacionDto asignacionUpdateDto){

          var username = User.GetUsername();
          asignacionUpdateDto.modifPor = User.GetUserId();

          if(asignacionUpdateDto == null)
            return BadRequest("NO AsignacionData!!");
      if (asignacionUpdateDto.ctrl_app_action == "ASIGNACION_CHANGE_PRIORITY")
      {
        var asig_UC = new AsignacionesChangePrior_UC(_unitOfWork, _mapper);

        var AsigResDto = await asig_UC.Update(asignacionUpdateDto);

        return AsigResDto;
      }
      else if (asignacionUpdateDto.ctrl_app_action == "ASIGNACION_CLOSE")
      {
            
        var asig_UC = new AsignacionClose_UC(_unitOfWork, _mapper);

        var AsigResDto = await asig_UC.Close(asignacionUpdateDto);

        return AsigResDto;

      }
      else
      {
        return BadRequest("NO UseCase FOUND!!");
      }


        }

    }
}