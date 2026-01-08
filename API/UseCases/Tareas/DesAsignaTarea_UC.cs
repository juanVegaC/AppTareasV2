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
    public class DesAsignaTarea_UC
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DesAsignaTarea_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<DesAsignaTareaResDto> Desasigna(UpdateTareaDto updateTareaDto){

            var result = new DesAsignaTareaResDto();
            var DesasigTareaDto = _mapper.Map<DesAsignaTareaDto>(updateTareaDto); 
                               
            try
            {
                result = await _unitOfWork.TareaRepository.DesasignaTarea(DesasigTareaDto);

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