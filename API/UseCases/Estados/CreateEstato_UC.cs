using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Estado;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Estados
{
    public class CreateEstado_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateEstado_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<CreateEstadoResDto> Create(CreateEstadoDto estadoDto){

            var result = new CreateEstadoResDto();
                               
            try
            {
                result = await _unitOfWork.EstadoRepository.Add(estadoDto);

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