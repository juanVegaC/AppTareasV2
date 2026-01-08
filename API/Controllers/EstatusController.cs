using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.Estatus;
using API.DTOs.Estatus.EstatusEdit;
using API.DTOs.Estatus.EstatusGetAll;
using API.Extensions;
using API.Interfaces;
using API.UseCases.Estatus;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EstatusController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public EstatusController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }
 

         [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetEstatus(string parameters)
        {

            var reqParams = JsonSerializer.Deserialize<EstatusParaAsigGetParamsDto>(parameters);

            reqParams.usuarioId = User.GetUserId();

            if (reqParams.ctrl_app_action == "ESTATUS_P_ASIG_ID"){
                var estatus = await _unitOfWork.EstatusRepository.GetEstatusParaAsigAsync(reqParams);
                return Ok(estatus);
            }else if (reqParams.ctrl_app_action == "ESTATUS_GET_ALL"){
                var lParam = new EstatusGetAllReqDto();
                lParam.usuarioId = User.GetUserId();
                var estatus = await _unitOfWork.EstatusRepository.GetEstatusAllAsync(lParam);
                return Ok(estatus);
            }else{
                return BadRequest("NO UseCase FOUND!!");
            }
        }

        [HttpPost]
        public async Task<ActionResult<CreateEstatusResDto>> CreateEstatus(CreateEstatusDto estatusDto){


          var create_UC = new CreateEstatus_UC(_unitOfWork,_mapper);

          estatusDto.creadoPor = User.GetUserId();
          //statusDto.creadoPor = 2;

          var result = await create_UC.Create(estatusDto);

          return result;
        }     

        [HttpPut]
        public async Task<ActionResult<EstatusEditResDto>> Update(EstatusEditReqDto  estatusDto){

            var updateEstatus = new UpdateEstatus_UC(_unitOfWork,_mapper);

            estatusDto.modifPor = User.GetUserId();

            var result = await updateEstatus.Update(estatusDto);

            return result;

        }        


    }
}