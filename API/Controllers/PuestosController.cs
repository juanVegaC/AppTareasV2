using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.Filters;
using API.DTOs.Puesto;
using API.DTOs.Puesto.PuestoCreate;
using API.DTOs.Puesto.PuestoEdit;
using API.DTOs.Puesto.PuestosGetAll;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.UseCases.Puestos;
using AutoMapper;
using AutoMapper.Internal.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
      //[Authorize]
    public class PuestosController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public PuestosController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }
 
         [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetPuestos(string parameters)
        {

            var reqParams = JsonSerializer.Deserialize<PuestosGetParamsDto>(parameters);

            reqParams.usuarioId = User.GetUserId();
            //userParams.CurrentUsername = User.GetUsername();
            //PagedList<TareaDto> tareas;

            //var filterData = JsonSerializer.Deserialize<FilterTareasDto>(userParams.filterResult);

            if (reqParams.ctrl_app_action == "PUESTOS_P_USUARIO"){
                var puestos = await _unitOfWork.PuestoRepository.GetPuestosPorUsuarioAsync(reqParams);
                return Ok(puestos);
            }else if (reqParams.ctrl_app_action == "PUESTOS_P_CREA_TAREA"){
                var puestos = await _unitOfWork.PuestoRepository.GetPuestosPCreaTareaAsync(reqParams);
                return Ok(puestos);
            }if (reqParams.ctrl_app_action == "PUESTOS_P_ASIG_TAREA"){
                var puestos = await _unitOfWork.PuestoRepository.GetPuestosPAsignaTareaAsync(reqParams);
                return Ok(puestos);
            }if (reqParams.ctrl_app_action == "PUESTOS_P_REGRESAR_TAREA"){
                var puestos = await _unitOfWork.PuestoRepository.GetPuestosPRegresarTareaAsync(reqParams);
                return Ok(puestos);
            }if (reqParams.ctrl_app_action == "PUESTOS_ALL"){
                var puestoGetAllReq = new PuestosGetAllReqDto();
                puestoGetAllReq.usuarioId =  User.GetUserId();
                var puestos = await _unitOfWork.PuestoRepository.GetPuestosAllAsync(puestoGetAllReq);
                return Ok(puestos);
            }else{
                return BadRequest("NO UseCase FOUND!!");
            }

        }


         [HttpGet("{tareaId}", Name = "GetPuestosParaTarea")]
        public async Task<ActionResult<IEnumerable<PuestoPorUsuarioDto>>> GetPuestosParaTarea(int tareaId)
        {

            var usuarioId_INT = User.GetUserId();
            var puestos = await _unitOfWork.PuestoRepository.GetPuestosParaTareaAsync(usuarioId_INT,tareaId);

            return Ok(puestos);

        }


        [HttpPost]
        public async Task<ActionResult<CreatePuestoResDto>> Create(CreatePuestoDto createPuestoDto){


          var createPuesto_UC = new CreatePuesto_UC(_unitOfWork,_mapper);

          createPuestoDto.creadoPor = User.GetUserId();
          //createPuestoDto.creadoPor = 2;

          var newPuestoDto = await createPuesto_UC.Create(createPuestoDto);

          return newPuestoDto;
        }
    
        [HttpPut]
        public async Task<ActionResult<PuestoEditResDto>> Update(PuestoEditReqDto  puestoDto){

            var updatePuesto = new UpdatePuesto_UC(_unitOfWork,_mapper);

            puestoDto.usuarioId = User.GetUserId();

            var result = await updatePuesto.Update(puestoDto);

            return result;

        }        
    }
}