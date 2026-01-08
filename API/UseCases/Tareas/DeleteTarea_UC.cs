using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Tarea;
using API.DTOs.Tarea.TareaDelete;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases
{
    public class DeleteTarea_UC
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DeleteTarea_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<DeleteTareaResDto> Delete(UpdateTareaDto updateTareaDto){

            var result = new DeleteTareaResDto();
            var delTareaDto = _mapper.Map<DeleteTareaDto>(updateTareaDto); 
            //Ticket ticketSQL;
                               
            try
            {
                result = await _unitOfWork.TareaRepository.DeleteTarea(delTareaDto);

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