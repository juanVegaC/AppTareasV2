using API.DTOs;
using API.DTOs.Asignacion.AsignacionClose;
using API.DTOs.Asignaciones;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Asignaciones
{
    public class AsignacionClose_UC
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AsignacionClose_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<AsignacionCloseDtoRes> Close(UpdateAsignacionDto asignacionUpdateDto){

            var result = new AsignacionCloseDtoRes();

                               
            try
            {
                result = await _unitOfWork.AsignacionesRepository.Close(asignacionUpdateDto);

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