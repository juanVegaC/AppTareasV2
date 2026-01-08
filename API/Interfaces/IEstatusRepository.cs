using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.Estatus;
using API.DTOs.Estatus.EstatusEdit;
using API.DTOs.Estatus.EstatusGetAll;

namespace API.Interfaces
{
    public interface IEstatusRepository
    {
        Task<CreateEstatusResDto> Add(CreateEstatusDto estatus);
        void Delete(DeleteEstatusDto estatus);
        Task<EstatusEditResDto> Update(EstatusEditReqDto estatus);


        Task<List<EstatusPorTipoDto>> GetEstatusPorTipoAsync(EstatusGetParamsDto reqParams);
        Task<List<EstatusParaAsigResDto>> GetEstatusParaAsigAsync(EstatusParaAsigGetParamsDto reqParams);
        Task<List<EstatusGetAllResDto>> GetEstatusAllAsync(EstatusGetAllReqDto reqParams);
        
    }
}