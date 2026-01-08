using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Texto.TextoEdit;
using API.Interfaces;
using AutoMapper;

namespace API.UseCases.Textos
{
    public class UpdateTexto_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateTexto_UC(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

        }

        public async Task<TextoEditResDto> Update(TextoEditReqDto textoDto){

            var result = new TextoEditResDto();
                               
            try
            {
                result = await _unitOfWork.TextoRepository.Update(textoDto);

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