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
    public class UpdateTareaPrioridad_UC
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateTareaPrioridad_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<UpdateTareaPrioResDto> Update(UpdateTareaDto updateTareaDto){

            var result = new UpdateTareaPrioResDto();
            var updTareaPrioridadDto = _mapper.Map<UpdateTareaPriorDto>(updateTareaDto); 

            var messages = _mapper.Map<ICollection<MsgDTO>>(null);
                               
            try
            {
                result = await _unitOfWork.TareaRepository.UpdateTareaPrioridad(updTareaPrioridadDto);

                await _unitOfWork.Complete();

                return result;

            }
            catch (System.Exception err)
            {
                
                result.messages.Add(new DbMsgResult("E",err.Message));
                return result;
            }                   

        }                       
    }
}