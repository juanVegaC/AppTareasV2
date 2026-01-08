using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Puesto.PuestoEdit;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Puestos
{
    public class UpdatePuesto_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdatePuesto_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<PuestoEditResDto> Update(PuestoEditReqDto updatePuestoDto){

            var result = new PuestoEditResDto();
            //result.messages = _mapper.Map<ICollection<DbMsgResult>>(null);
            //Ticket ticketSQL;
                               
            try
            {
                result = await _unitOfWork.PuestoRepository.Update(updatePuestoDto);

                await _unitOfWork.Complete();

                return result;

            }
            catch (System.Exception err)
            {
                
                result.messages.Add(new  DbMsgResult("E",err.Message));
                //ticketDto.messages = messages;
                return result;
            }                   

        }                
    }
}