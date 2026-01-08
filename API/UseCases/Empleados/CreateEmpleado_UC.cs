using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Empleado;
using API.DTOs.Empleado.EmpleadoCreate;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Empleados
{
    public class CreateEmpleado_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateEmpleado_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<CreateEmpleadoResDto> Create(CreateEmpleadoDto createEmpleadoDto){

             var result = new CreateEmpleadoResDto();
                               
            try
            {
                result = await _unitOfWork.EmpleadoRepository.Add(createEmpleadoDto);

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