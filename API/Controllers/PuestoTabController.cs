using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.TabEstado.PuestoTabCreate;
using API.DTOs.TabEstado.PuestoTabEdit;
using API.DTOs.TabEstado.PuestoTabGetAll;
using API.DTOs.Tablero;
using API.Extensions;
using API.Interfaces;
using API.UseCases.PuestoTab;
using API.UseCases.Tableros;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PuestoTabController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public PuestoTabController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetPuestoTab(string parameters)
        {

            var reqParams = JsonSerializer.Deserialize<PuestoTabGetParamsDto>(parameters);


            //reqParams.usuarioId = User.GetUserId();

            var puestoTabGetAllReq = new PuestoTabGetAllReqDto();
            puestoTabGetAllReq.puestoId = reqParams.puestoId;
            puestoTabGetAllReq.usuarioId =  User.GetUserId();
            var puestoTabs = await _unitOfWork.PuestoTabRepository.GetPuestoTabAllAsync(puestoTabGetAllReq);
            return Ok(puestoTabs);


        }
 

        [HttpPost]
        public async Task<ActionResult<PuestoTabCreateResDto>> CreatePuestoTab(PuestoTabCreateReqDto puestoTabDto){


          var create_UC = new CreatePuestoTab_UC(_unitOfWork,_mapper);

          puestoTabDto.asignadoPor = User.GetUserId();

          var result = await create_UC.Create(puestoTabDto);

          return result;
        }
        
          [HttpPut]
        public async Task<ActionResult<PuestoTabEditResDto>> Update(PuestoTabEditReqDto puestoTabDto){

            var updatePuestoTab = new UpdatePuestoTab_UC(_unitOfWork,_mapper);

            puestoTabDto.modifPor = User.GetUserId();

            var result = await updatePuestoTab.Update(puestoTabDto);

            return result;

        }        
 
    }
}