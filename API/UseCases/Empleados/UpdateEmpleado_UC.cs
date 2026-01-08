using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Empleado.EmpleadoEdit;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Empleados
{
    public class UpdateEmpleado_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateEmpleado_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<EmpleadoEditResDto> Update(EmpleadoEditReqDto updateEmpleadoDto){

            var result = new EmpleadoEditResDto();
                               
            try
            {
                result = await _unitOfWork.EmpleadoRepository.Update(updateEmpleadoDto);

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