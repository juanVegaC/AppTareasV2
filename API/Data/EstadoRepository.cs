using API.Data;
using API.DTOs;
using API.DTOs.Estado;
using API.DTOs.Estado.EstadosGetAll;
using API.Entities;
using API.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class EstadoRepository : IEstadoRepository
    {
        private readonly DataContext _context;
        public EstadoRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<List<EstadosGetAllResDto>> GetEstadosAllAsync(EstadosGetAllReqDto param)
        {

            return await _context.Database.SqlQuery<EstadosGetAllResDto>($"EstadosGetAll @UsuarioId={param.usuarioId}").ToListAsync();
 
        }


        public async Task<CreateEstadoResDto> Add(CreateEstadoDto estado)
        {

            CreateEstadoResDto estadoRes;
            var pEstado = new SqlParameter("@pEstado", estado.estado);
            var pCreadoPor = new SqlParameter("@pCreadoPor", estado.creadoPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pEstado);
            parameters.Add(pCreadoPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec EstadoCreate @estado=@pEstado,@creadoPor=@pCreadoPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                estadoRes = new CreateEstadoResDto();
                estadoRes.messages = new List<DbMsgResult>();
                estadoRes.messages.Add(new DbMsgResult("E",err.Message));
                return estadoRes;

            } 

            estadoRes = JsonSerializer.Deserialize<CreateEstadoResDto>(pResult.Value.ToString());
            return estadoRes;


        }



    }
}
