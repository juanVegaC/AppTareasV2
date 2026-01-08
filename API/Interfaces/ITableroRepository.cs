using API.DTOs.Tablero;
using API.DTOs.Tablero.TableroEdit;
using API.DTOs.Tablero.TablerosGetAll;
using API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ITableroRepository
    {
        Task<CreateTableroResDto> Add(CreateTableroDto tablero);
        void Delete(Tablero tablero);
        Task<TableroEditResDto> Update(TableroEditReqDto tablero);
        Task<IEnumerable<Tablero>> GetTablerosAsync();
        Task<List<TablerosGetAllResDto>> GetTablerosAllAsync(TablerosGetAllReqDto param);

    }
}
