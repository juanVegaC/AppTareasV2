using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Tarea;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Tareas
{
    public class AsignaTarea_UC
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AsignaTarea_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<AsignaTareaResDto> Asigna(UpdateTareaDto updateTareaDto){

            var result = new AsignaTareaResDto();
            var asigTareaDto = _mapper.Map<AsignaTareaDto>(updateTareaDto); 
            var messages = _mapper.Map<ICollection<MsgDTO>>(null);
            //Ticket ticketSQL;
                               
            try
            {
                result = await _unitOfWork.TareaRepository.AsignaTarea(asigTareaDto);

                await _unitOfWork.Complete();

                return result;

            }
            catch (System.Exception err)
            {
                
                result.messages.Add(new DbMsgResult("E",err.Message));
                //ticketDto.messages = messages;
                return result;
            }                   

        }               
    }
}