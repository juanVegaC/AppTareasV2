using API.Data;
using API.DTOs;
using API.DTOs.Tablero;
using API.DTOs.Tablero.TableroEdit;
using API.DTOs.Tablero.TablerosGetAll;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Data
{
    public class TableroRepository : ITableroRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public TableroRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CreateTableroResDto> Add(CreateTableroDto tablero)
        {

            CreateTableroResDto tableroRes;

            var pNombre = new SqlParameter("@pNombre", tablero.nombre);
            var pCreadoPor = new SqlParameter("@pCreadoPor", tablero.creadoPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pNombre);
            parameters.Add(pCreadoPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec TableroCreate @nombre=@pNombre,@creadoPor=@pCreadoPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                tableroRes = new CreateTableroResDto();
                tableroRes.messages = new List<DbMsgResult>();
                tableroRes.messages.Add(new DbMsgResult("E",err.Message));
                return tableroRes;

            }
            
            tableroRes = JsonSerializer.Deserialize<CreateTableroResDto>(pResult.Value.ToString());
            return tableroRes;

        }

        public void Delete(Tablero tablero)
        {
            _context.Tableros.Remove(tablero);
        }

        public async Task<TableroEditResDto> Update(TableroEditReqDto tablero)
        {
            TableroEditResDto tableroRes;

            var pId = new SqlParameter("@pId", tablero.Id);
            var pNombre = new SqlParameter("@pNombre", tablero.nombre);
            var pModifPor = new SqlParameter("@pModifPor", tablero.modifPor);
            var pBorrado = new SqlParameter("@pBorrado", tablero.borrado);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pId);
            parameters.Add(pNombre);
            parameters.Add(pModifPor);
            parameters.Add(pBorrado);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec TableroEdit @id=@pId,@nombre=@pNombre,@modifPor=@pModifPor,@borrado=@pBorrado,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                tableroRes = new TableroEditResDto();
                tableroRes.messages = new List<DbMsgResult>();
                tableroRes.messages.Add(new DbMsgResult("E",err.Message));
                return tableroRes;

            }
            
            tableroRes = JsonSerializer.Deserialize<TableroEditResDto>(pResult.Value.ToString());
            return tableroRes;

        }

        public async Task<List<TablerosGetAllResDto>> GetTablerosAllAsync(TablerosGetAllReqDto param)
        {
            return await _context.Database.SqlQuery<TablerosGetAllResDto>($"TablerosGetAll @id={param.Id}, @UsuarioId={param.usuarioId}").ToListAsync();

        }

        public async Task<IEnumerable<Tablero>> GetTablerosAsync()
        {
            return await _context.Tableros.ToListAsync();
        }

    }
}
