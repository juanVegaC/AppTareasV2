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
    public class UpdateTarea_UC
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateTarea_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<TareaEditResDto> Update(UpdateTareaDto updateTareaDto){

            var result = new TareaEditResDto();
            var tareaEditDto = _mapper.Map<TareaEditReqDto>(updateTareaDto);

            //Ticket ticketSQL;
                               
            try
            {
                result = await _unitOfWork.TareaRepository.UpdateTarea(tareaEditDto);

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