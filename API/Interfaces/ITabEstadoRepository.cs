using API.DTOs.TabEstado;
using API.DTOs.TabEstado.TabEstadoEdit;
using API.DTOs.TabEstado.TabEstadosGetAll;
using API.DTOs.Tablero;
using API.DTOs.Tablero.TablerosGetAll;
using API.Entities;

namespace API.Interfaces
{
    public interface ITabEstadoRepository
    {
        Task<CreateTabEstadoResDto> Add(CreateTabEstadoDto estado);

        Task<TabEstadoEditResDto> Update(TabEstadoEditReqDto tablero);
        Task<List<TabEstadosGetAllResDto>> GetTabEstadosAllAsync(TabEstadosGetAllReqDto param);

    }
}
