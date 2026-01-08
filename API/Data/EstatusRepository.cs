using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Estatus;
using API.DTOs.Estatus.EstatusEdit;
using API.DTOs.Estatus.EstatusGetAll;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EstatusRepository: IEstatusRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

       public EstatusRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            
        }

        public async Task<CreateEstatusResDto> Add(CreateEstatusDto estatus)
        {
            
            CreateEstatusResDto estatusRes;
            var pTipo = new SqlParameter("@pTipo", estatus.tipo);
            var pEstatus = new SqlParameter("@pEstatus", estatus.estatus);
            var pTextoId = new SqlParameter("@pTextoId", estatus.textoId);
            var pCreadoPor = new SqlParameter("@pCreadoPor", estatus.creadoPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pTipo);
            parameters.Add(pEstatus);
            parameters.Add(pTextoId);
            parameters.Add(pCreadoPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec EstatusCreate @tipo=@pTipo,@estatus=@pEstatus,@textoId=@pTextoId,@creadoPor=@pCreadoPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                estatusRes = new CreateEstatusResDto();
                estatusRes.messages = new List<DbMsgResult>();
                estatusRes.messages.Add(new DbMsgResult("E",err.Message));
                return estatusRes;

            } 
            
            estatusRes = JsonSerializer.Deserialize<CreateEstatusResDto>(pResult.Value.ToString());
            return estatusRes;
            
            
        }

        public async Task<EstatusEditResDto> Update(EstatusEditReqDto estatus)
        {
            
            EstatusEditResDto estatusRes;
            var pId = new SqlParameter("@pId", estatus.Id);
            var pTipo = new SqlParameter("@pTipo", estatus.tipo);
            var pEstatus = new SqlParameter("@pEstatus", estatus.estatus);
            var pTextoId = new SqlParameter("@pTextoId", estatus.textoId);
            var pModifPor = new SqlParameter("@pModifPor", estatus.modifPor);
            var pBorrado = new SqlParameter("@pBorrado", estatus.borrado);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pId);
            parameters.Add(pTipo);
            parameters.Add(pEstatus);
            parameters.Add(pTextoId);
            parameters.Add(pModifPor);
            parameters.Add(pBorrado);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec EstatusEdit @id=@pId,@tipo=@pTipo,@estatus=@pEstatus,@textoId=@pTextoId,@modifPor=@pModifPor,@borrado=@pBorrado,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                estatusRes = new EstatusEditResDto();
                estatusRes.messages = new List<DbMsgResult>();
                estatusRes.messages.Add(new DbMsgResult("E",err.Message));
                return estatusRes;

            } 
            
            estatusRes = JsonSerializer.Deserialize<EstatusEditResDto>(pResult.Value.ToString());
            return estatusRes;
            
            
        }


        public void Delete(DeleteEstatusDto estatus)
        {
            //_context.Database.ExecuteSql($"TareaDelete @Id={tarea.Id},@modifPor={tarea.modifPor}");
        }

        public void Update(UpdateEstatusDto estatus)
        {
            //_context.Database.ExecuteSql($"TareaUpdate @Id={tarea.Id},@numero={tarea.numero},@texto={tarea.texto},@docuUrl={tarea.docuUrl},@modifPor={tarea.modifPor}");
        }

        public async Task<List<EstatusPorTipoDto>> GetEstatusPorTipoAsync(EstatusGetParamsDto reqParams)
        {
            return await _context.Database.SqlQuery<EstatusPorTipoDto>($"GetEstatusPorTipo @tipo={1}").ToListAsync();
 
        }
        public async Task<List<EstatusParaAsigResDto>> GetEstatusParaAsigAsync(EstatusParaAsigGetParamsDto reqParams)
        {
            return await _context.Database.SqlQuery<EstatusParaAsigResDto>($"EstatusGetParaAsig @asigId={reqParams.asigId}").ToListAsync();
 
        }
        public async Task<List<EstatusGetAllResDto>> GetEstatusAllAsync(EstatusGetAllReqDto reqParams)
        {
            return await _context.Database.SqlQuery<EstatusGetAllResDto>($"EstatusGetAll @UsuarioId={reqParams.usuarioId}").ToListAsync();
 
        }

    }

}