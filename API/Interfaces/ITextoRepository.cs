using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Texto;
using API.DTOs.Texto.TextoEdit;
using API.DTOs.Texto.TextosGetAll;

namespace API.Interfaces
{
    public interface ITextoRepository
    {
        Task<CreateTextoResDto> Add(CreateTextoDto texto);
        void Delete(DeleteTextoDto texto);
        Task<TextoEditResDto> Update(TextoEditReqDto texto);

        Task<List<TextosGetAllResDto>> GetTextosAllAsync(TextosGetAllReqDto param);


        
    }
}