using API.DTOs.TabEstado.PuestoTabCreate;
using API.DTOs.TabEstado.PuestoTabEdit;
using API.DTOs.TabEstado.PuestoTabGetAll;
using API.DTOs.Tablero;
using API.DTOs.Tablero.TableroEdit;
using API.DTOs.Tablero.TablerosGetAll;
using API.Entities;

namespace API.Interfaces
{
    public interface IPuestoTabRepository
    {
        Task<PuestoTabCreateResDto> Add(PuestoTabCreateReqDto puestoTab);

        Task<List<PuestoTabGetAllResDto>> GetPuestoTabAllAsync(PuestoTabGetAllReqDto param);

        Task<PuestoTabEditResDto> Update(PuestoTabEditReqDto puestoTab);

    }
}
