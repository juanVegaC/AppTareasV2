using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Tablero;
using API.DTOs.Texto;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Tableros
{
    public class CreateTablero_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public CreateTablero_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<CreateTableroResDto> Create(CreateTableroDto tableroDto){

            var result = new CreateTableroResDto();
                               
            try
            {
                result = await _unitOfWork.TableroRepository.Add(tableroDto);

                await _unitOfWork.Complete();

                return result;

            }
            catch (System.Exception err)
            {
                
                result.messages.Add(new DbMsgResult ("E",err.Message));

                return result;
            }                   

        }        
        
    }
}