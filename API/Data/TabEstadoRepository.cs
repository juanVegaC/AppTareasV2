using API.DTOs;
using API.DTOs.Estado;
using API.DTOs.Estado.EstadosGetAll;
using API.DTOs.TabEstado;
using API.DTOs.TabEstado.TabEstadoEdit;
using API.DTOs.TabEstado.TabEstadosGetAll;
using API.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text.Json;

namespace API.Data
{
    public class TabEstadoRepository : ITabEstadoRepository
    {
        private readonly DataContext _context;
        public TabEstadoRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<List<TabEstadosGetAllResDto>> GetTabEstadosAllAsync(TabEstadosGetAllReqDto param)
        {

            return await _context.Database.SqlQuery<TabEstadosGetAllResDto>($"TabEstadosGetAll @UsuarioId={param.usuarioId}, @tableroId={param.tableroId}").ToListAsync();

        }

        public async Task<TabEstadoEditResDto> Update(TabEstadoEditReqDto tabEstado)
        {
            TabEstadoEditResDto tabEstadoRes;

            var pId = new SqlParameter("@pId", tabEstado.Id);
            var pTableroId = new SqlParameter("@pTableroId", tabEstado.tableroId);
            var pEstadoId = new SqlParameter("@pEstadoId", tabEstado.estadoId);
            var pPosicion = new SqlParameter("@pPosicion", tabEstado.posicion);
            var pPoolAsigId = new SqlParameter("@pPoolAsigId", tabEstado.poolAsigId);
            var pPoolAsigTabId = new SqlParameter("@pPoolAsigTabId", tabEstado.poolAsigTabId);
            var pPoolAsigEdoId = new SqlParameter("@pPoolAsigEdoId", tabEstado.poolAsigEdoId);
            var pAsigAPuestoId = new SqlParameter("@pAsigAPuestoId", tabEstado.asigAPuestoId);
            var pAsigATabId = new SqlParameter("@pAsigATabId", tabEstado.asigATabId);
            var pAsigAEdoId = new SqlParameter("@pAsigAEdoId", tabEstado.asigAEdoId);
            var pCierraAsig = new SqlParameter("@pCierraAsig", tabEstado.cierraAsig);
            var pModifPor = new SqlParameter("@pModifPor", tabEstado.modifPor);
            var pResult = new SqlParameter("@pResult", "");
            pResult.Direction = ParameterDirection.Output;
            pResult.Size = 4000;
            pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pId);
            parameters.Add(pTableroId);
            parameters.Add(pEstadoId);
            parameters.Add(pPosicion);
            parameters.Add(pPoolAsigId);
            parameters.Add(pPoolAsigTabId);
            parameters.Add(pPoolAsigEdoId);
            parameters.Add(pAsigAPuestoId);
            parameters.Add(pAsigATabId);
            parameters.Add(pAsigAEdoId);
            parameters.Add(pCierraAsig);
            parameters.Add(pModifPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec TabEstadoEdit @id=@pId, @tableroId=@pTableroId,@estadoId=@pEstadoId,@posicion=@pPosicion,@poolAsigId=@pPoolAsigId,@poolAsigTabId=@pPoolAsigTabId,@poolAsigEdoId=@pPoolAsigEdoId,@cierraAsig=@pCierraAsig,@modifPor=@pModifPor,@asigAPuestoId=@pAsigAPuestoId,@asigATabId=@pAsigATabId,@asigAEdoId=@pAsigAEdoId,@result=@pResult OUTPUT", parameters.ToArray());

            }
            catch (System.Exception err)
            {
                tabEstadoRes = new TabEstadoEditResDto();
                tabEstadoRes.messages = new List<DbMsgResult>();
                tabEstadoRes.messages.Add(new DbMsgResult("E", err.Message));
                return tabEstadoRes;

            }

            tabEstadoRes = JsonSerializer.Deserialize<TabEstadoEditResDto>(pResult.Value.ToString());
            return tabEstadoRes;


        }


        public async Task<CreateTabEstadoResDto> Add(CreateTabEstadoDto estado)
        {

            CreateTabEstadoResDto estadoRes;
            var pTableroId = new SqlParameter("@pTableroId", estado.tableroId);
            var pEstadoId = new SqlParameter("@pEstadoId", estado.estadoId);
            var pPosicion = new SqlParameter("@pPosicion", estado.posicion);
            var pAsignadoPor = new SqlParameter("@pAsignadoPor", estado.asignadoPor);
            var pResult = new SqlParameter("@pResult", "");
            pResult.Direction = ParameterDirection.Output;
            pResult.Size = 4000;
            pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pTableroId);
            parameters.Add(pEstadoId);
            parameters.Add(pPosicion);
            parameters.Add(pAsignadoPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec TabEstadoCreate @tableroId=@pTableroId,@estadoId=@pEstadoId,@posicion=@pPosicion,@asignadoPor=@pAsignadoPor,@result=@pResult OUTPUT", parameters.ToArray());

            }
            catch (System.Exception err)
            {
                estadoRes = new CreateTabEstadoResDto();
                estadoRes.messages = new List<DbMsgResult>();
                estadoRes.messages.Add(new DbMsgResult("E", err.Message));
                return estadoRes;

            }

            estadoRes = JsonSerializer.Deserialize<CreateTabEstadoResDto>(pResult.Value.ToString());
            return estadoRes;


        }



    }
}
