using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Puesto;
using API.DTOs.Puesto.PuestoCreate;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Puestos
{
    public class CreatePuesto_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreatePuesto_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<CreatePuestoResDto> Create(CreatePuestoDto createPuestoDto){

            var result = new CreatePuestoResDto();
            //var messages = _mapper.Map<ICollection<MsgDTO>>(null);
            //Ticket ticketSQL;
                               
            try
            {
                result = await _unitOfWork.PuestoRepository.Add(createPuestoDto);

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