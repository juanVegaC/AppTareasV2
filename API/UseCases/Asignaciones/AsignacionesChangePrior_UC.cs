using API.DTOs;
using API.DTOs.Asignaciones;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Asignaciones
{
    public class AsignacionesChangePrior_UC
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AsignacionesChangePrior_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<AsignacionUpdPriorResDto> Update(UpdateAsignacionDto asignacionUpdateDto){

            var result = new AsignacionUpdPriorResDto();


            //var tareaEditDto = _mapper.Map<TareaEditReqDto>(updateTareaDto);

            //Ticket ticketSQL;
                               
            try
            {
                result = await _unitOfWork.AsignacionesRepository.UpdatePrioridades(asignacionUpdateDto);

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