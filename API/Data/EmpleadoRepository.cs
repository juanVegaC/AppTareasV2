using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Empleado;
using API.DTOs.Empleado.EmpleadoCreate;
using API.DTOs.Empleado.EmpleadoEdit;
using API.DTOs.Empleado.EmpleadosGet;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EmpleadoRepository: IEmpleadoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

       public EmpleadoRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            
        }

       public async Task<EmpleadoEditResDto> Update(EmpleadoEditReqDto empleado)
        {
            EmpleadoEditResDto empleadoRes;

            var pId = new SqlParameter("@pId", empleado.Id);
            var pPuestoId = new SqlParameter("@pPuestoId", empleado.puestoId);
            var pUserId = new SqlParameter("@pUserId", empleado.userId);
            var pPrincipal = new SqlParameter("@pPrincipal", empleado.principal);
            var pValidoDesde = new SqlParameter("@pValidoDesde", empleado.validoDesde);
            var pValidoHasta = new SqlParameter("@pValidoHasta", empleado.validoHasta);
            var pModifPor = new SqlParameter("@pModifPor", empleado.modifPor);
            var pBorrado = new SqlParameter("@pBorrado", empleado.borrado);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pId);
            parameters.Add(pPuestoId);
            parameters.Add(pUserId);
            parameters.Add(pPrincipal);
            parameters.Add(pValidoDesde);
            parameters.Add(pValidoHasta);
            parameters.Add(pModifPor);
            parameters.Add(pBorrado);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec EmpleadoEdit @id=@pId,@puestoId=@pPuestoId,@userId=@pUserId,@principal=@pPrincipal,@validoDesde=@pValidoDesde,@validoHasta=@pValidoHasta,@modifPor=@pModifPor,@borrado=@pBorrado,@result=@pResult OUTPUT",parameters.ToArray());  
                //var result = await _context.Database.ExecuteSqlRawAsync("exec EmpleadoEdit @id=@pId,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                empleadoRes = new EmpleadoEditResDto();
                empleadoRes.messages = new List<DbMsgResult>();
                empleadoRes.messages.Add(new DbMsgResult("E",err.Message));
                return empleadoRes;

            }
            
            empleadoRes = JsonSerializer.Deserialize<EmpleadoEditResDto>(pResult.Value.ToString());
            return empleadoRes;

        }

       public async Task<CreateEmpleadoResDto> Add(CreateEmpleadoDto empleado)
        {
            CreateEmpleadoResDto empleadoRes;

            var pPuestoId = new SqlParameter("@pPuestoId", empleado.puestoId);
            var pUserId = new SqlParameter("@pUserId", empleado.userId);
            var pPrincipal = new SqlParameter("@pPrincipal", empleado.principal);
            var pValidoDesde = new SqlParameter("@pValidoDesde", empleado.validoDesde);
            var pValidoHasta = new SqlParameter("@pValidoHasta", empleado.validoHasta);
            var pCreadoPor = new SqlParameter("@pCreadoPor", empleado.creadoPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pPuestoId);
            parameters.Add(pUserId);
            parameters.Add(pPrincipal);
            parameters.Add(pValidoDesde);
            parameters.Add(pValidoHasta);
            parameters.Add(pCreadoPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec EmpleadoCreate @puestoId=@pPuestoId,@userId=@pUserId,@principal=@pPrincipal,@validoDesde=@pValidoDesde,@validoHasta=@pValidoHasta,@creadoPor=@pCreadoPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                empleadoRes = new CreateEmpleadoResDto();
                empleadoRes.messages = new List<DbMsgResult>();
                empleadoRes.messages.Add(new DbMsgResult("E",err.Message));
                return empleadoRes;

            }
            
            empleadoRes = JsonSerializer.Deserialize<CreateEmpleadoResDto>(pResult.Value.ToString());
            return empleadoRes;

        }


        public async Task<List<EmpleadosGetAllResDto>> GetEmpleadosAllAsync(EmpleadosGetAllReqDto param)
        {

            return await _context.Database.SqlQuery<EmpleadosGetAllResDto>($"EmpleadosGetAll @UsuarioId={param.usuarioId}").ToListAsync();
 
        }

        
    }
}