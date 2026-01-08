using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.TabEstado;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.TabEstados
{
    public class CreateTabEstado_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateTabEstado_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<CreateTabEstadoResDto> Create(CreateTabEstadoDto tabEstadoDto){

            var result = new CreateTabEstadoResDto();
                               
            try
            {
                result = await _unitOfWork.TabEstadoRepository.Add(tabEstadoDto);

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