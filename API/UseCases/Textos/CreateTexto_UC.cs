using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Texto;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Textos
{
    public class CreateTexto_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CreateTexto_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<CreateTextoResDto> Create(CreateTextoDto textoDto){

            var result = new CreateTextoResDto();
                               
            try
            {
                result = await _unitOfWork.TextoRepository.Add(textoDto);

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