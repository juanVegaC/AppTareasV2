using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.TabEstado.PuestoTabCreate;
using API.DTOs.TabEstado.PuestoTabEdit;
using API.DTOs.Tablero;
using API.DTOs.Texto;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.PuestoTab
{
    public class UpdatePuestoTab_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public UpdatePuestoTab_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<PuestoTabEditResDto> Update(PuestoTabEditReqDto puestoTabDto){

            var result = new PuestoTabEditResDto();

            try
            {
                result = await _unitOfWork.PuestoTabRepository.Update(puestoTabDto);

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