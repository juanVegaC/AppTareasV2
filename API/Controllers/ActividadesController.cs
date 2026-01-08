using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.Actividad;
using API.DTOs.Actividad.ActividadPorAsigGet;
using API.Extensions;
using API.Interfaces;
using API.UseCases.Actividades;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActividadesController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public ActividadesController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }
 


        [HttpPost]
        public async Task<ActionResult<CreateActividadResDto>> CreateActividad(CreateActividadDto actividadDto){


          var create_UC = new CreateActividad_UC(_unitOfWork,_mapper);

          //actividadDto.creadoPor = User.GetUserId();
          actividadDto.creadoPor = 2;

          var result = await create_UC.Create(actividadDto);

          return result;
        }

         [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetActividades(string parameters)
        {

            var reqParams = JsonSerializer.Deserialize<ActividadGetParamsDto>(parameters);

            reqParams.usuarioId = User.GetUserId();

            if (reqParams.ctrl_app_action == "ACTIVIDAD_D_ASIG"){
                var lo_params = _mapper.Map<ActividadPorAsigGetReqDto>(reqParams);
                var actividades = await _unitOfWork.ActividadRepository.GetActividadPorAsigAsync(lo_params);
                return Ok(actividades);
            }else{
                return BadRequest("NO UseCase FOUND!!");
            }

        }



    }

}