using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.Tablero;
using API.DTOs.Tablero.TableroEdit;
using API.DTOs.Tablero.TablerosGetAll;
using API.Extensions;
using API.Interfaces;
using API.UseCases.Tableros;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TablerosController: BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

       public TablerosController(IUnitOfWork unitOfWork, IMapper mapper,IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetTableros(string parameters)
        {


            var tableroGetAllReq = JsonSerializer.Deserialize<TablerosGetAllReqDto>(parameters);
            tableroGetAllReq.usuarioId =  User.GetUserId();
            var tableros = await _unitOfWork.TableroRepository.GetTablerosAllAsync(tableroGetAllReq);
            return Ok(tableros);


        }


        [HttpPost]
        public async Task<ActionResult<CreateTableroResDto>> CreateTablero(CreateTableroDto tableroDto){


          var create_UC = new CreateTablero_UC(_unitOfWork,_mapper);

          //tableroDto.creadoPor = User.GetUserId();
          tableroDto.creadoPor = 2;

          var result = await create_UC.Create(tableroDto);

          return result;
        }
        
         [HttpPut]
        public async Task<ActionResult<TableroEditResDto>> Update(TableroEditReqDto  tableroDto){

            var updateTablero = new UpdateTablero_UC(_unitOfWork,_mapper);

            tableroDto.modifPor = User.GetUserId();

            var result = await updateTablero.Update(tableroDto);

            return result;

        }        
 
    }
}