using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Linq;
using API.DTOs;
using API.DTOs.Filters;
using API.DTOs.Tarea;
using API.DTOs.Tarea.TareaDelete;
using API.DTOs.TareasPuestoTab.TareasPuestoTabGet;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTAsigFromPool;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTAsigna;
using API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTMoveEdo;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Data
{
    public class TareaRepository: ITareaRepository
    {

        private readonly DataContext _context;
        private readonly IMapper _mapper;

       public TareaRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            
        }

        public async Task<CreateTareaResDto> AddTarea(CreateTareaDto tarea)
        {
            
            CreateTareaResDto tareaRes;
            var pNumero = new SqlParameter("@pNumero", tarea.numero);
            var pTexto = new SqlParameter("@pTexto", tarea.texto);
            var pDocuUrl = new SqlParameter("@pDocuUrl", tarea.docuUrl);
            var pCreadoPor = new SqlParameter("@pCreadoPor", tarea.creadoPor);
            var pAsignadoA = new SqlParameter("@pAsignadoA", tarea.asignadoA);
            var pTableroId  = new SqlParameter("@pTableroId", tarea.tableroId);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pNumero);
            parameters.Add(pTexto);
            parameters.Add(pDocuUrl);
            parameters.Add(pCreadoPor);
            parameters.Add(pAsignadoA);
            parameters.Add(pTableroId);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec TareaCreate @numero=@pNumero,@texto=@pTexto,@docuUrl=@pDocuUrl,@creadoPor=@pCreadoPor,@asignadoA=@pAsignadoA,@tableroId=@pTableroId,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                tareaRes = new CreateTareaResDto();
                tareaRes.messages = new List<DbMsgResult>();
                tareaRes.messages.Add(new DbMsgResult("E",err.Message));
                return tareaRes;

            }

            tareaRes = JsonSerializer.Deserialize<CreateTareaResDto>(pResult.Value.ToString());
            return tareaRes;
            
            
            //_context.Database.ExecuteSql($"TareaCreate @numero={tarea.numero},@texto={tarea.texto},@docuUrl={tarea.docuUrl},@creadoPor={tarea.creadoPor},@asignadoA={tarea.asignadoA}");
        }
        public async Task<DeleteTareaResDto> DeleteTarea(DeleteTareaDto tarea)
        {
            var pId = new SqlParameter("@pId", tarea.Id);
            var pModifPor = new SqlParameter("@pModifPor", tarea.modifPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            
            parameters.Add(pId);
            parameters.Add(pModifPor);
            parameters.Add(pResult);


            var result = await _context.Database.ExecuteSqlRawAsync("exec TareaDelete @pId=@pId,@pModifPor=@pModifPor,@result=@pResult OUTPUT",parameters.ToArray());  
            
            DeleteTareaResDto tareaRes;
            
            tareaRes = JsonSerializer.Deserialize<DeleteTareaResDto>(pResult.Value.ToString());
            return tareaRes;

            //_context.Database.ExecuteSql($"TareaDelete @Id={tarea.Id},@modifPor={tarea.modifPor}");
        }
        public async Task<AsignaTareaResDto> AsignaTarea(AsignaTareaDto tarea)
        {

            var pTareaId = new SqlParameter("@pId", tarea.Id);
            var pAsigId = new SqlParameter("@pAsigId", tarea.asigId);
            var pPuestoId = new SqlParameter("@pPuestoId", tarea.puestoId);
            var pNewPuestoId = new SqlParameter("@pNewPuestoId", tarea.newPuestoId);
            var pModifPor = new SqlParameter("@pModifPor", tarea.modifPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pTareaId);
            parameters.Add(pAsigId);
            parameters.Add(pPuestoId);
            parameters.Add(pNewPuestoId);
            parameters.Add(pModifPor);
            parameters.Add(pResult);


            var result = await _context.Database.ExecuteSqlRawAsync("exec TareaAsigna @Id=@pId,@asigId=@pAsigId,@puestoId=@pPuestoId,@newPuestoId=@pNewPuestoId,@modifPor=@pModifPor,@result=@pResult OUTPUT",parameters.ToArray());  
            
            AsignaTareaResDto tareaRes;
            
            tareaRes = JsonSerializer.Deserialize<AsignaTareaResDto>(pResult.Value.ToString());
            return tareaRes;

            //_context.Database.ExecuteSql($"TareaAsigna @Id={tarea.Id},@puestoId={tarea.puestoId},@modifPor={tarea.modifPor},@result={result} OUTPUT");

        }

        public async Task<TareasPTMoveEdoResDto> MoveTareaEstado(TareasPTMoveEdoReqDto tarea)
        {

            TareasPTMoveEdoResDto tareaRes;

            var pAsigId = new SqlParameter("@pAsigId", tarea.asigId);
            var pPuestoIdNew = new SqlParameter("@pPuestoIdNew", tarea.puestoIdNew);
            var pTableroIdNew = new SqlParameter("@pTableroIdNew", tarea.tableroIdNew);
            var pEstadoIdNew = new SqlParameter("@pEstadoIdNew", tarea.estadoIdNew);
            var pEstadoPosNew = new SqlParameter("@pEstadoPosNew", tarea.estadoPosNew);
            var pModifPor = new SqlParameter("@pModifPor", tarea.usuarioId);
            var pResult = new SqlParameter("@pResult", "");
            pResult.Direction = ParameterDirection.Output;
            pResult.Size = 4000;
            pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pAsigId);
            parameters.Add(pPuestoIdNew);
            parameters.Add(pTableroIdNew);
            parameters.Add(pEstadoIdNew);
            parameters.Add(pEstadoPosNew);
            parameters.Add(pModifPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec AsignacionMove @asigId=@pAsigId,@puestoIdNew=@pPuestoIdNew,@tableroIdNew=@pTableroIdNew,@estadoIdNew=@pEstadoIdNew,@estadoPosNew=@pEstadoPosNew,@modifPor=@pModifPor,@result=@pResult OUTPUT", parameters.ToArray());

            }
            catch (System.Exception err)
            {
                tareaRes = new TareasPTMoveEdoResDto();
                tareaRes.messages = new List<DbMsgResult>();
                tareaRes.messages.Add(new DbMsgResult("E", err.Message));
                return tareaRes;

            }

            tareaRes = JsonSerializer.Deserialize<TareasPTMoveEdoResDto>(pResult.Value.ToString());
            return tareaRes;

        }
        public async Task<TareasPTAsignaResDto> TableroAsigna(TareasPTAsignaReqDto tarea)
        {

            TareasPTAsignaResDto tareaRes;

            var pTareaId = new SqlParameter("@pTareaId", tarea.tareaId);
            var pAsigId = new SqlParameter("@pAsigId", tarea.asigId);
            var pEstadoIdNew = new SqlParameter("@pEstadoIdNew", tarea.estadoIdNew);
            var pEstadoPosNew = new SqlParameter("@pEstadoPosNew", tarea.estadoPosNew);
            var pPuestoIdNew = new SqlParameter("@pPuestoIdNew", tarea.puestoIdNew);
            var pTableroIdNew = new SqlParameter("@pTableroIdNew", tarea.tableroIdNew);
            var pModifPor = new SqlParameter("@pModifPor", tarea.usuarioId);
            var pResult = new SqlParameter("@pResult", "");
            pResult.Direction = ParameterDirection.Output;
            pResult.Size = 4000;
            pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pTareaId);
            parameters.Add(pAsigId);
            parameters.Add(pEstadoIdNew);
            parameters.Add(pEstadoPosNew);
            parameters.Add(pModifPor);
            parameters.Add(pPuestoIdNew);
            parameters.Add(pTableroIdNew);
            parameters.Add(pResult);

            try
            {
            var result = await _context.Database.ExecuteSqlRawAsync("exec AsignacionCreate @Id=@pTareaId,@asigId=@pAsigId,@newPuestoId=@pPuestoIdNew,@tableroIdNew=@pTableroIdNew,@estadoIdNew=@pEstadoIdNew,@estadoPosNew=@pEstadoPosNew,@modifPor=@pModifPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                tareaRes = new TareasPTAsignaResDto();
                tareaRes.messages = new List<DbMsgResult>();
                tareaRes.messages.Add(new DbMsgResult("E", err.Message));
                return tareaRes;

            }

            tareaRes = JsonSerializer.Deserialize<TareasPTAsignaResDto>(pResult.Value.ToString());
            return tareaRes;

        }
        public async Task<DesAsignaTareaResDto> DesasignaTarea(DesAsignaTareaDto tarea)
        {

            var pAsigId = new SqlParameter("@pAsigId", tarea.asigId);
            var pModifPor = new SqlParameter("@pModifPor", tarea.modifPor);
            var pResult = new SqlParameter("@pResult", "");
            pResult.Direction = ParameterDirection.Output;
            pResult.Size = 4000;
            pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pAsigId);
            parameters.Add(pModifPor);
            parameters.Add(pResult);


            var result = await _context.Database.ExecuteSqlRawAsync("exec TareaDesAsigna @asigId=@pAsigId,@modifPor=@pModifPor,@result=@pResult OUTPUT", parameters.ToArray());

            DesAsignaTareaResDto tareaRes;

            tareaRes = JsonSerializer.Deserialize<DesAsignaTareaResDto>(pResult.Value.ToString());
            return tareaRes;

        }

        public async Task<TareaEditResDto> UpdateTarea(TareaEditReqDto tarea)
        {
            var pId = new SqlParameter("@pId", tarea.Id);
            var pNumero = new SqlParameter("@pNumero", tarea.numero);
            var pTexto = new SqlParameter("@pTexto", tarea.texto);
            var pDocuUrl = new SqlParameter("@pDocuUrl", tarea.docuUrl);
            var pModifPor = new SqlParameter("@pModifPor", tarea.modifPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pId);
            parameters.Add(pNumero);
            parameters.Add(pTexto);
            parameters.Add(pDocuUrl);
            parameters.Add(pModifPor);
            parameters.Add(pResult);

            var result = await _context.Database.ExecuteSqlRawAsync("exec TareaEdit @pId=@pId,@pNumero=@pNumero,@pTexto=@pTexto,@pDocuUrl=@pDocuUrl,@pModifPor=@pModifPor,@result=@pResult OUTPUT",parameters.ToArray());  
            
            TareaEditResDto tareaRes;
            
            tareaRes = JsonSerializer.Deserialize<TareaEditResDto>(pResult.Value.ToString());
            return tareaRes;

            //_context.Database.ExecuteSql($"TareaUpdate @Id={tarea.Id},@numero={tarea.numero},@texto={tarea.texto},@docuUrl={tarea.docuUrl},@modifPor={tarea.modifPor}");
        }
        public async Task<UpdateTareaPrioResDto> UpdateTareaPrioridad(UpdateTareaPriorDto tarea)
        {

            var pAsigId = new SqlParameter("@pAsigId", tarea.asigId);
            var pPrioridad = new SqlParameter("@pPrioridad", tarea.prioridad);
            var pModifPor = new SqlParameter("@pModifPor", tarea.modifPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pAsigId);
            parameters.Add(pPrioridad);
            parameters.Add(pModifPor);
            parameters.Add(pResult);


            var result = await _context.Database.ExecuteSqlRawAsync("exec TareaUpdatePrioridad @asigId=@pAsigId,@prioridad=@pPrioridad,@modifPor=@pModifPor,@result=@pResult OUTPUT",parameters.ToArray());  
            
            UpdateTareaPrioResDto tareaRes;
            
            tareaRes = JsonSerializer.Deserialize<UpdateTareaPrioResDto>(pResult.Value.ToString());
            return tareaRes;

            //_context.Database.ExecuteSql($"TareaUpdatePrioridad @asigId={tarea.asigId},@prioridad={tarea.prioridad},@modifPor={tarea.modifPor}");
        }

        public async Task<List<STareasPorPuestoDto>> GetTareasPorPuestoAsync(UserParams userParams, FilterTareasDto filter)
        {
            return await _context.Database.SqlQuery<STareasPorPuestoDto>($"TareasGetPorPuestoId @PuestoId={filter.puestoId},@UsuarioId={filter.usuarioId}").ToListAsync();

        }
        public async Task<List<TareasPuestoTabGetResDto>> GetTareasPuestoTabAsync(TareasPuestoTabGetReqDto filter)
        {
            return await _context.Database.SqlQuery<TareasPuestoTabGetResDto>($"TareasPuestoTabGet @PuestoId={filter.puestoId},@TableroId={filter.tableroId},@UsuarioId={filter.usuarioId}").ToListAsync();

        }


        public async Task<List<STareasPorPuestoDto>> GetPrioridadesPorPuestoAsync(UserParams userParams, FilterTareasDto filter)
        {
            return await _context.Database.SqlQuery<STareasPorPuestoDto>($"TareasGetPrioridadesPorPuestoId @PuestoId={filter.puestoId},@UsuarioId={filter.usuarioId}").ToListAsync();

        }

    }
}