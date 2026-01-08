using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Filters;
using API.DTOs.TareasPuestoTab.TareasPuestoTabGet;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTAsigna;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTMoveEdo;
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
    public class TareasPuestoTabController : BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public TareasPuestoTabController(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> Get(string parameters)
        {

            var reqParams = JsonSerializer.Deserialize<TareasPuestoTabGetReqDto>(parameters);

            //userParams.CurrentUsername = User.GetUsername();
            //PagedList<TareaDto> tareas;



            //reqParams.usuarioId =  User.GetUserId();
            var tareas = await _unitOfWork.TareaRepository.GetTareasPuestoTabAsync(reqParams);
            return Ok(tareas);

        }
        

        [HttpPut]
        public async Task<ActionResult<Object>> Update(TareasPuestoTabMoveReqDto tarea){


          if (tarea == null)
            return BadRequest("NO tareaData!!");
            
          if (tarea.ctrl_app_action == "TAREA_MUEVE_ESTADO")
          {

            var data = JsonSerializer.Deserialize<TareasPTMoveEdoReqDto>(tarea.data);
            data.usuarioId = User.GetUserId();
            var tarea_UC = new TareaTabMoveEdo_UC(_unitOfWork, _mapper);

            var TareaDto = await tarea_UC.Move(data);

            return TareaDto;
          }
          else if (tarea.ctrl_app_action == "TAREA_ASIGNA_FROM_POOL")
          {
            //otros casos
            var data = JsonSerializer.Deserialize<TareasPTAsignaReqDto>(tarea.data);
            data.usuarioId = User.GetUserId();
            var tarea_UC = new TareaTabAsigna_UC(_unitOfWork, _mapper);

            var TareaDto = await tarea_UC.Asigna(data);

            return TareaDto;

          }else if (tarea.ctrl_app_action == "ASIGNACION_MUEVE_ESTADO")
          {
            //otros casos
            var data = JsonSerializer.Deserialize<TareasPTMoveEdoReqDto>(tarea.data);
            data.usuarioId = User.GetUserId();
            var tarea_UC = new TareaTabMoveEdo_UC(_unitOfWork, _mapper);

            var TareaDto = await tarea_UC.Move(data);

            return TareaDto;

          }
          else
          {
            return BadRequest("NO UseCase FOUND!!");
          }



        }



    }
}