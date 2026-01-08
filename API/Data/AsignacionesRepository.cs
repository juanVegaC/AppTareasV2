using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Asignacion;
using API.DTOs.Asignacion.AsignacionClose;
using API.DTOs.Asignaciones;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AsignacionesRepository : IAsignacionesRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public AsignacionesRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        public async Task<List<AsignacionesPorTareaResDto>> GetAsignacionesDeTareaAsync(AsignacionesPorTareaReqDto reqParams)
        {

            return await _context.Database.SqlQuery<AsignacionesPorTareaResDto>($"AsignacionesGetPorTareaId @UsuarioId={reqParams.usuarioId},@TareaId={reqParams.tareaId}").ToListAsync();

        }

        public async Task<AsignacionUpdPriorResDto> UpdatePrioridades(UpdateAsignacionDto asignaciones)
        {

            AsignacionUpdPriorResDto asigRes;

            var pAsigJson = new SqlParameter("@pAsignacionesJson", asignaciones.data_str);
            var pModifPor = new SqlParameter("@pModifPor", asignaciones.modifPor);
            var pResult = new SqlParameter("@pResult", "");
            pResult.Direction = ParameterDirection.Output;
            pResult.Size = 4000;
            pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pAsigJson);
            parameters.Add(pModifPor);
            parameters.Add(pResult);


            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec AsignacionesPrioridadUpdate @pAsignacionesJson=@pAsignacionesJson,@pModifPor=@pModifPor,@result=@pResult OUTPUT", parameters.ToArray());

            }
            catch (System.Exception err)
            {
                asigRes = new AsignacionUpdPriorResDto();
                asigRes.messages = new List<DbMsgResult>();
                asigRes.messages.Add(new DbMsgResult("E", err.Message));
                return asigRes;

            }

            asigRes = JsonSerializer.Deserialize<AsignacionUpdPriorResDto>(pResult.Value.ToString());
            return asigRes;
        }

        
        public async Task<AsignacionCloseDtoRes> Close(UpdateAsignacionDto asignaciones)
        {

            AsignacionCloseDtoRes asigRes;


            var asignacion = JsonSerializer.Deserialize<AsignacionCloseDtoReq>(asignaciones.data_str);

            

            var pAsigIdJson = new SqlParameter("@pId", asignacion.Id);
            var pModifPor = new SqlParameter("@pModifPor", asignaciones.modifPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pAsigIdJson);
            parameters.Add(pModifPor);
            parameters.Add(pResult);
            

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec AsignacionClose @pId=@pId,@pModifPor=@pModifPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                asigRes = new AsignacionCloseDtoRes();
                asigRes.messages = new List<DbMsgResult>();
                asigRes.messages.Add(new DbMsgResult("E",err.Message));
                return asigRes;

            } 
            
            asigRes = JsonSerializer.Deserialize<AsignacionCloseDtoRes>(pResult.Value.ToString());
            return asigRes;
        }


    }
}