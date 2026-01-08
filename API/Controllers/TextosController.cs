using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.Texto;
using API.DTOs.Texto.TextoEdit;
using API.DTOs.Texto.TextosGetAll;
using API.Extensions;
using API.Interfaces;
using API.UseCases.Textos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TextosController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public TextosController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetTextos(string parameters)
        {

            var reqParams = JsonSerializer.Deserialize<TextosGetParamsDto>(parameters);


            reqParams.usuarioId = User.GetUserId();


            if (reqParams.ctrl_app_action == "TEXTOS_GET_ALL"){
                var textoGetAllReq = new TextosGetAllReqDto();
                textoGetAllReq.usuarioId =  User.GetUserId();
                var textos = await _unitOfWork.TextoRepository.GetTextosAllAsync(textoGetAllReq);
                return Ok(textos);
            }else{
                return BadRequest("NO UseCase FOUND!!");
            }

        }


        [HttpPost]
        public async Task<ActionResult<CreateTextoResDto>> CreateTexto(CreateTextoDto textoDto){


          var create_UC = new CreateTexto_UC(_unitOfWork,_mapper);

          //textoDto.creadoPor = User.GetUserId();
          textoDto.creadoPor = 2;

          var result = await create_UC.Create(textoDto);

          return result;
        }
        
        [HttpPut]
        public async Task<ActionResult<TextoEditResDto>> Update(TextoEditReqDto  textoDto){

            var updateTexto = new UpdateTexto_UC(_unitOfWork,_mapper);

            textoDto.usuarioId = User.GetUserId();

            var result = await updateTexto.Update(textoDto);

            return result;

        }        

    }
}