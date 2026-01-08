using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.TabEstado;
using API.DTOs.TabEstado.TabEstadoEdit;
using API.DTOs.TabEstado.TabEstadosGetAll;
using API.Extensions;
using API.Interfaces;
using API.UseCases.TabEstados;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TabEstadosController : BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public TabEstadosController(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetTabEstados(string parameters)
        {


            var tabEstadosGetAllReq = JsonSerializer.Deserialize<TabEstadosGetAllReqDto>(parameters);
            tabEstadosGetAllReq.usuarioId = User.GetUserId();

            var tabEstados = await _unitOfWork.TabEstadoRepository.GetTabEstadosAllAsync(tabEstadosGetAllReq);
            return Ok(tabEstados);

        }


        [HttpPost]
        public async Task<ActionResult<CreateTabEstadoResDto>> CreateTabEstado(CreateTabEstadoDto tabEstadoDto)
        {


            var create_UC = new CreateTabEstado_UC(_unitOfWork, _mapper);

            //tabEstadoDto.creadoPor = User.GetUserId();
            tabEstadoDto.asignadoPor = User.GetUserId();

            var result = await create_UC.Create(tabEstadoDto);

            return result;
        }
        

          [HttpPut]
        public async Task<ActionResult<TabEstadoEditResDto>> Update(TabEstadoEditReqDto  tableroDto){

             var updateTablero = new UpdateTabEstado_UC(_unitOfWork,_mapper);

            tableroDto.modifPor = User.GetUserId();

            var result = await updateTablero.Update(tableroDto);

            return result; 

        }     

    }

}