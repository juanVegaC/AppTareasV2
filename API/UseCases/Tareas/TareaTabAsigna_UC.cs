using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Tarea;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTAsigFromPool;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTAsigna;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTMoveEdo;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Tareas
{
    public class TareaTabAsigna_UC
    {
       private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public TareaTabAsigna_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<TareasPTAsignaResDto> Asigna(TareasPTAsignaReqDto tarea){

            var result = new TareasPTAsignaResDto();

            try
            {
                result = await _unitOfWork.TareaRepository.TableroAsigna(tarea);

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