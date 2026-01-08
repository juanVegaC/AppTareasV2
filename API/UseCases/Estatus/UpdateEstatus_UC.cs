using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Estatus.EstatusEdit;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Estatus
{
    public class UpdateEstatus_UC
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateEstatus_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<EstatusEditResDto> Update(EstatusEditReqDto estatusDto){

            var result = new EstatusEditResDto();
                               
            try
            {
                result = await _unitOfWork.EstatusRepository.Update(estatusDto);

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