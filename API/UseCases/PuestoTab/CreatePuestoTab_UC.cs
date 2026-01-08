using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.TabEstado.PuestoTabCreate;
using API.DTOs.Tablero;
using API.DTOs.Texto;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.PuestoTab
{
    public class CreatePuestoTab_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public CreatePuestoTab_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<PuestoTabCreateResDto> Create(PuestoTabCreateReqDto puestoTabDto){

            var result = new PuestoTabCreateResDto();

            try
            {
                result = await _unitOfWork.PuestoTabRepository.Add(puestoTabDto);

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