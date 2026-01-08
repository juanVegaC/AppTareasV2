using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.TabEstado;
using API.DTOs.TabEstado.TabEstadoEdit;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.TabEstados
{
    public class UpdateTabEstado_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateTabEstado_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<TabEstadoEditResDto> Update(TabEstadoEditReqDto tabEstadoDto){

            var result = new TabEstadoEditResDto();
                               
            try
            {
                result = await _unitOfWork.TabEstadoRepository.Update(tabEstadoDto);

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