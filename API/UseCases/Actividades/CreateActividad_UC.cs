using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Actividad;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Actividades
{
    public class CreateActividad_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateActividad_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<CreateActividadResDto> Create(CreateActividadDto actividadDto){

            var result = new CreateActividadResDto();
                               
            try
            {
                result = await _unitOfWork.ActividadRepository.Add(actividadDto);

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