using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs.Actividad;
using API.DTOs.Actividad.ActividadPorAsigGet;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ActividadRepository: IActividadRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

       public ActividadRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            
        }

        public async Task<CreateActividadResDto> Add(CreateActividadDto actividad)
        {
            
            var pAsigId = new SqlParameter("@pAsigId", actividad.asigId);
            var pFecha = new SqlParameter("@pFecha", actividad.fecha);
            var pAvance = new SqlParameter("@pAvance", actividad.avance);
            var pTexto = new SqlParameter("@pTexto", actividad.texto);
            var pActvHrs = new SqlParameter("@pActvHrs", actividad.actvHrs);
            var pActvMins = new SqlParameter("@pActvMins", actividad.actvMins);
            //var pEstatus = new SqlParameter("@pEstatus", actividad.estatus);
            //var pNewPuestoId = new SqlParameter("@pNewPuestoId", actividad.newPuestoId);
            var pCreadoPor = new SqlParameter("@pCreadoPor", actividad.creadoPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pAsigId);
            parameters.Add(pFecha);
            parameters.Add(pAvance);
            parameters.Add(pTexto);
            parameters.Add(pActvHrs);
            parameters.Add(pActvMins);
            //parameters.Add(pEstatus);
            //parameters.Add(pNewPuestoId);
            parameters.Add(pCreadoPor);
            parameters.Add(pResult);


            //var result = await _context.Database.ExecuteSqlRawAsync("exec ActividadCreate @asigId=@pAsigId,@fecha=@pFecha,@avance=@pAvance,@texto=@pTexto,@actvHrs=@pActvHrs,@actvMins=@pActvMins,@estatus=@pEstatus,@newPuestoId=@pNewPuestoId,@creadoPor=@pCreadoPor,@result=@pResult OUTPUT",parameters.ToArray());  
            var result = await _context.Database.ExecuteSqlRawAsync("exec ActividadCreate @asigId=@pAsigId,@fecha=@pFecha,@avance=@pAvance,@texto=@pTexto,@actvHrs=@pActvHrs,@actvMins=@pActvMins,@creadoPor=@pCreadoPor,@result=@pResult OUTPUT",parameters.ToArray());  
            
            CreateActividadResDto actividadRes;
            
            actividadRes = JsonSerializer.Deserialize<CreateActividadResDto>(pResult.Value.ToString());
            return actividadRes;
            
            
        }

        public async Task<List<ActividadPorAsigGetResDto>> GetActividadPorAsigAsync(ActividadPorAsigGetReqDto filter)
        {
            return await _context.Database.SqlQuery<ActividadPorAsigGetResDto>($"ActividadesPorAsigGet @usuarioId={filter.usuarioId}, @asigId={filter.asigId}").ToListAsync();
        }


        
    }
}