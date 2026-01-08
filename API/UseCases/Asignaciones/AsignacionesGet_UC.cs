using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Asignacion;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Asignaciones
{
    public class AsignacionesGet_UC
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AsignacionesGet_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        
       public async Task<IEnumerable<AsignacionesPorTareaResDto>> GetAsigDeTarea(AsignacionesGetParamsDto reqParam){

            //var result = new AsignacionesPorTareaResDto();
            var asigParam = _mapper.Map<AsignacionesPorTareaReqDto>(reqParam);
                               
            try
            {
                var result = await _unitOfWork.AsignacionesRepository.GetAsignacionesDeTareaAsync(asigParam);

                await _unitOfWork.Complete();

                return result;

            }
            catch (System.Exception err)
            {
                

                return null;
            }                   

        }          
    }
}