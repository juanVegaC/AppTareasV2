using API.DTOs.Estado;
using API.DTOs.Estado.EstadosGetAll;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.UseCases.Estados;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    
    public class EstadosController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public EstadosController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetEstados(string parameters)
        {

            //var reqParams = JsonSerializer.Deserialize<EstadosDto>(parameters);

            //reqParams.usuarioId = User.GetUserId();

            var lParam = new EstadosGetAllReqDto();
            lParam.usuarioId = User.GetUserId();
            var estados = await _unitOfWork.EstadoRepository.GetEstadosAllAsync(lParam);
            return Ok(estados);
                
            //return BadRequest("NO UseCase FOUND!!");
        }

        [HttpPost]
        public async Task<ActionResult<CreateEstadoResDto>> CreateEstado(CreateEstadoDto estadoDto)
        {
          var create_UC = new CreateEstado_UC(_unitOfWork,_mapper);

          estadoDto.creadoPor = User.GetUserId();

          var result = await create_UC.Create(estadoDto);

          return Ok(result);
        }

    }
}
