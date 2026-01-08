using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Estatus;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Estatus
{
    public class CreateEstatus_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateEstatus_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<CreateEstatusResDto> Create(CreateEstatusDto estatusDto){

            var result = new CreateEstatusResDto();
                               
            try
            {
                result = await _unitOfWork.EstatusRepository.Add(estatusDto);

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