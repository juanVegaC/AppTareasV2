using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Filters;
using API.DTOs.Puesto;
using API.DTOs.Puesto.PuestoCreate;
using API.DTOs.Puesto.PuestoEdit;
using API.DTOs.Puesto.PuestosGetAll;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PuestoRepository: IPuestoRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

       public PuestoRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            
        }

/*         public void Add(CreatePuestoDto puesto)
        {
            _context.Database.ExecuteSql($"PuestoCreate @titulo={puesto.titulo},@puestoSupId={puesto.puestoSupId},@creadoPor={puesto.creadoPor}");
        }
 */        public void Delete(DeletePuestoDto tarea)
        {
            //_context.Database.ExecuteSql($"TareaDelete @Id={tarea.Id},@modifPor={tarea.modifPor}");
        }

       public async Task<PuestoEditResDto> Update(PuestoEditReqDto puesto)
        {
            PuestoEditResDto puestoRes;

            var pId = new SqlParameter("@pId", puesto.Id);
            var pTitulo = new SqlParameter("@pTitulo", puesto.titulo);
            var pPuestoSupId = new SqlParameter("@pPuestoSupId", puesto.puestoSupId);
            var pPublico = new SqlParameter("@pPublico", puesto.publico);
            var pBorrado = new SqlParameter("@pBorrado", puesto.borrado);
            var pModifPor = new SqlParameter("@pModifPor", puesto.usuarioId);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pId);
            parameters.Add(pTitulo);
            parameters.Add(pPuestoSupId);
            parameters.Add(pPublico);
            parameters.Add(pBorrado);
            parameters.Add(pModifPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec PuestoEdit @pId=@pId,@pTitulo=@pTitulo,@pPuestoSupId=@pPuestoSupId,@pPublico=@pPublico,@pBorrado=@pBorrado,@pModifPor=@pModifPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                puestoRes = new PuestoEditResDto();
                puestoRes.messages = new List<DbMsgResult>();
                puestoRes.messages.Add(new DbMsgResult("E",err.Message));
                return puestoRes;

            }
            
            puestoRes = JsonSerializer.Deserialize<PuestoEditResDto>(pResult.Value.ToString());
            return puestoRes;

        }
       public async Task<CreatePuestoResDto> Add(CreatePuestoDto puesto)
        {
            CreatePuestoResDto puestoRes;

            var pTitulo = new SqlParameter("@pTitulo", puesto.titulo);
            var pPuestoSupId = new SqlParameter("@pPuestoSupId", puesto.puestoSupId);
            var pPublico = new SqlParameter("@pPublico", puesto.publico);
            var pCreadoPor = new SqlParameter("@pCreadoPor", puesto.creadoPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pTitulo);
            parameters.Add(pPuestoSupId);
            parameters.Add(pPublico);
            parameters.Add(pCreadoPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec PuestoCreate @pTitulo=@pTitulo,@pPuestoSupId=@pPuestoSupId,@pPublico=@pPublico,@pCreadoPor=@pCreadoPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                puestoRes = new CreatePuestoResDto();
                puestoRes.messages = new List<DbMsgResult>();
                puestoRes.messages.Add(new DbMsgResult("E",err.Message));
                return puestoRes;

            }
            
            puestoRes = JsonSerializer.Deserialize<CreatePuestoResDto>(pResult.Value.ToString());
            return puestoRes;

        }
 

        public async Task<List<Puesto>> GetPuestosAsync(UserParams userParams, string filter)
        {
/*             var puestoId = new SqlParameter("@PuestoId", 0);
            var puestoIdInt = 1; */
            return await _context.Database.SqlQuery<Puesto>($"GetTareasPorPuesto @PuestoId={1}").ToListAsync();
 
        }
        public async Task<List<PuestosGetAllResDto>> GetPuestosAllAsync(PuestosGetAllReqDto param)
        {
/*             var puestoId = new SqlParameter("@PuestoId", 0);
            var puestoIdInt = 1; */
            return await _context.Database.SqlQuery<PuestosGetAllResDto>($"PuestosGetAll @UsuarioId={param.usuarioId}").ToListAsync();
 
        }

        public async Task<List<PuestoPorUsuarioDto>> GetPuestosPorUsuarioAsync(PuestosGetParamsDto reqParams)
        {

            return await _context.Database.SqlQuery<PuestoPorUsuarioDto>($"PuestosGetPorUsuarioId @UsuarioId={reqParams.usuarioId}").ToListAsync();
 
        }
        public async Task<List<PuestoPorUsuarioDto>> GetPuestosPCreaTareaAsync(PuestosGetParamsDto reqParams)
        {

            return await _context.Database.SqlQuery<PuestoPorUsuarioDto>($"PuestosGetPCreaTarea @UsuarioId={reqParams.usuarioId}").ToListAsync();
 
        }
        public async Task<List<PuestoPorUsuarioDto>> GetPuestosPAsignaTareaAsync(PuestosGetParamsDto reqParams)
        {

            return await _context.Database.SqlQuery<PuestoPorUsuarioDto>($"PuestosGetPAsignaTarea @UsuarioId={reqParams.usuarioId},@TareaId={reqParams.tareaId}").ToListAsync();
 
        }
        public async Task<List<PuestoPorUsuarioDto>> GetPuestosPRegresarTareaAsync(PuestosGetParamsDto reqParams)
        {

            return await _context.Database.SqlQuery<PuestoPorUsuarioDto>($"PuestosGetPRegresarTarea @UsuarioId={reqParams.usuarioId},@TareaId={reqParams.tareaId}").ToListAsync();
 
        }

        public async Task<List<PuestoPorUsuarioDto>> GetPuestosParaTareaAsync(int usuarioId, int tareaId)
        {

            return await _context.Database.SqlQuery<PuestoPorUsuarioDto>($"PuestosGetParaTarea @UsuarioId={usuarioId}, @TareaId={tareaId}").ToListAsync();
 
        }

    }
}