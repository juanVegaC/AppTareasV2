using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Filters;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using API.UseCases;
using API.UseCases.Tareas;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   [Authorize]
    public class TareasController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public TareasController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }
 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TareaDto>>> GetTareas([FromQuery]UserParams userParams)
        {

            userParams.CurrentUsername = User.GetUsername();
            //PagedList<TareaDto> tareas;

            var filterData = JsonSerializer.Deserialize<FilterTareasDto>(userParams.filterResult);
            filterData.usuarioId = User.GetUserId();
            if(filterData.type == "TAREAS_DE_PUESTO"){
              var tareas = await _unitOfWork.TareaRepository.GetTareasPorPuestoAsync(userParams,filterData);
              return Ok(tareas);
            }else if(filterData.type == "PRIORIDADES_DE_PUESTO"){
              var tareas = await _unitOfWork.TareaRepository.GetPrioridadesPorPuestoAsync(userParams,filterData);
              return Ok(tareas);
            }else{
              return BadRequest("NO UseCase FOUND!!");
            }


              

        }

        [HttpPost]
        public async Task<ActionResult<Object>> CreateTarea(CreateTareaDto createTareaDto){


          var createTarea_UC = new CreateTarea_UC(_unitOfWork,_mapper);

          createTareaDto.creadoPor = User.GetUserId();

          var newTareaDto = await createTarea_UC.Create(createTareaDto);

          return newTareaDto;
        }

        [HttpPut]
        public async Task<ActionResult<Object>> UpdateTarea(UpdateTareaDto tareaUpdateDto){

          var username = User.GetUsername();
          tareaUpdateDto.modifPor = User.GetUserId();

          if(tareaUpdateDto == null)
            return BadRequest("NO tareaData!!");
          if(tareaUpdateDto.ctrl_app_action == "TAREA_DELETE"){
            var tarea_UC = new DeleteTarea_UC(_unitOfWork,_mapper);
            
            var TareaDto = await tarea_UC.Delete(tareaUpdateDto);

            return TareaDto;
          }else if(tareaUpdateDto.ctrl_app_action == "TAREA_EDIT"){
            var tarea_UC = new UpdateTarea_UC(_unitOfWork,_mapper);

            var tareaDto = await tarea_UC.Update(tareaUpdateDto);

            return tareaDto;
          }else if(tareaUpdateDto.ctrl_app_action == "TAREA_ASIGNA"){
            var tarea_UC = new AsignaTarea_UC(_unitOfWork,_mapper);

            var tareaDto = await tarea_UC.Asigna(tareaUpdateDto);

            return tareaDto;
          }else if(tareaUpdateDto.ctrl_app_action == "TAREA_DESASIGNA"){
            var tarea_UC = new DesAsignaTarea_UC(_unitOfWork,_mapper);

            var tareaDto = await tarea_UC.Desasigna(tareaUpdateDto);

            return tareaDto;
          }else if(tareaUpdateDto.ctrl_app_action == "TAREA_UPDATE_PRIORIDAD"){
            var tarea_UC = new UpdateTareaPrioridad_UC(_unitOfWork,_mapper);

            var tareaDto = await tarea_UC.Update(tareaUpdateDto);

            return tareaDto;
          }else{
            return BadRequest("NO UseCase FOUND!!");
          }



        }


    }
}