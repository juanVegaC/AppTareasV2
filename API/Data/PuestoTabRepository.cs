using API.Data;
using API.DTOs;
using API.DTOs.TabEstado.PuestoTabCreate;
using API.DTOs.TabEstado.PuestoTabEdit;
using API.DTOs.TabEstado.PuestoTabGetAll;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text.Json;

namespace API.Data
{
    public class PuestoTabRepository : IPuestoTabRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PuestoTabRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<PuestoTabGetAllResDto>> GetPuestoTabAllAsync(PuestoTabGetAllReqDto param)
        {

            return await _context.Database.SqlQuery<PuestoTabGetAllResDto>($"PuestoTabGetAll @puestoId={param.puestoId}, @usuarioId={param.usuarioId}").ToListAsync();

        }

        public async Task<PuestoTabCreateResDto> Add(PuestoTabCreateReqDto puestoTab)
        {

            PuestoTabCreateResDto puestoTabRes;

            var pPuestoId = new SqlParameter("@pPuestoId", puestoTab.puestoId);
            var pTableroId = new SqlParameter("@pTableroId", puestoTab.tableroId);
            var pPrincipal = new SqlParameter("@pPrincipal", puestoTab.principal);
            var pAsignadoPor = new SqlParameter("@pAsignadoPor", puestoTab.asignadoPor);
            var pResult = new SqlParameter("@pResult", "");
            pResult.Direction = ParameterDirection.Output;
            pResult.Size = 4000;
            pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pPuestoId);
            parameters.Add(pTableroId);
            parameters.Add(pPrincipal);
            parameters.Add(pAsignadoPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec PuestoTabCreate @puestoId=@pPuestoId,@tableroId=@pTableroId,@principal=@pPrincipal,@asignadoPor=@pAsignadoPor,@result=@pResult OUTPUT", parameters.ToArray());

            }
            catch (System.Exception err)
            {
                puestoTabRes = new PuestoTabCreateResDto();
                puestoTabRes.messages = new List<DbMsgResult>();
                puestoTabRes.messages.Add(new DbMsgResult("E", err.Message));
                return puestoTabRes;

            }

            puestoTabRes = JsonSerializer.Deserialize<PuestoTabCreateResDto>(pResult.Value.ToString());
            return puestoTabRes;

        }

       public async Task<PuestoTabEditResDto> Update(PuestoTabEditReqDto puestoTab)
        {

            PuestoTabEditResDto puestoTabRes;

            var pId = new SqlParameter("@pId", puestoTab.id);
            var pPuestoId = new SqlParameter("@pPuestoId", puestoTab.puestoId);
            var pTableroId = new SqlParameter("@pTableroId", puestoTab.tableroId);
            var pPrincipal = new SqlParameter("@pPrincipal", puestoTab.principal);
            var pAsignadoPor = new SqlParameter("@pModifPor", puestoTab.modifPor);
            var pBorrado = new SqlParameter("@pBorrado", puestoTab.borrado);
            var pResult = new SqlParameter("@pResult", "");
            pResult.Direction = ParameterDirection.Output;
            pResult.Size = 4000;
            pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pId);
            parameters.Add(pPuestoId);
            parameters.Add(pTableroId);
            parameters.Add(pPrincipal);
            parameters.Add(pAsignadoPor);
            parameters.Add(pBorrado);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec PuestoTabEdit @id=@pId,@puestoId=@pPuestoId,@tableroId=@pTableroId,@principal=@pPrincipal,@modifPor=@pModifPor,@borrado=@pBorrado,@result=@pResult OUTPUT", parameters.ToArray());

            }
            catch (System.Exception err)
            {
                puestoTabRes = new PuestoTabEditResDto();
                puestoTabRes.messages = new List<DbMsgResult>();
                puestoTabRes.messages.Add(new DbMsgResult("E", err.Message));
                return puestoTabRes;

            }

            puestoTabRes = JsonSerializer.Deserialize<PuestoTabEditResDto>(pResult.Value.ToString());
            return puestoTabRes;

        }



    }
}
