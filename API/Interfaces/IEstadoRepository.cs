using API.DTOs.Estado;
using API.DTOs.Estado.EstadosGetAll;
using API.Entities;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IEstadoRepository
    {


        Task<CreateEstadoResDto> Add(CreateEstadoDto estado);

        Task<List<EstadosGetAllResDto>> GetEstadosAllAsync(EstadosGetAllReqDto param);
    }
}
