using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Texto;
using API.DTOs.Texto.TextoEdit;
using API.DTOs.Texto.TextosGetAll;
using API.Interfaces;
using AutoMapper;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TextoRepository: ITextoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

       public TextoRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            
        }

        public async Task<CreateTextoResDto> Add(CreateTextoDto texto)
        {

            CreateTextoResDto textoRes;
            
            var pTextoId = new SqlParameter("@pTextoId", texto.textoId);
            var pIdioma = new SqlParameter("@pIdioma", texto.idioma);
            var pTexto = new SqlParameter("@pTexto", texto.texto);
            var pCreadoPor = new SqlParameter("@pCreadoPor", texto.creadoPor);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pTextoId);
            parameters.Add(pIdioma);
            parameters.Add(pTexto);
            parameters.Add(pCreadoPor);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec TextoCreate @textoId=@pTextoId,@idioma=@pIdioma,@texto=@pTexto,@creadoPor=@pCreadoPor,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                textoRes = new CreateTextoResDto();
                textoRes.messages = new List<DbMsgResult>();
                textoRes.messages.Add(new DbMsgResult("E",err.Message));
                return textoRes;

            }
            
            textoRes = JsonSerializer.Deserialize<CreateTextoResDto>(pResult.Value.ToString());
            return textoRes;
            
            
        }

        public async Task<TextoEditResDto> Update(TextoEditReqDto texto)
        {

            TextoEditResDto textoRes;
            
            var pId = new SqlParameter("@pId", texto.Id);
            var pTextoId = new SqlParameter("@pTextoId", texto.textoId);
            var pIdioma = new SqlParameter("@pIdioma", texto.idioma);
            var pTexto = new SqlParameter("@pTexto", texto.texto);
            var pModifPor = new SqlParameter("@pModifPor", texto.usuarioId);
            var pBorrado = new SqlParameter("@pBorrado", texto.borrado);
            var pResult = new SqlParameter("@pResult","");
                pResult.Direction = ParameterDirection.Output;
                pResult.Size = 4000;
                pResult.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(pId);
            parameters.Add(pTextoId);
            parameters.Add(pIdioma);
            parameters.Add(pTexto);
            parameters.Add(pModifPor);
            parameters.Add(pBorrado);
            parameters.Add(pResult);

            try
            {
                var result = await _context.Database.ExecuteSqlRawAsync("exec TextoEdit @id=@pId,@textoId=@pTextoId,@idioma=@pIdioma,@texto=@pTexto,@modifPor=@pModifPor,@borrado=@pBorrado,@result=@pResult OUTPUT",parameters.ToArray());  

            }
            catch (System.Exception err)
            {
                textoRes = new TextoEditResDto();
                textoRes.messages = new List<DbMsgResult>();
                textoRes.messages.Add(new DbMsgResult("E",err.Message));
                return textoRes;

            }
            
            textoRes = JsonSerializer.Deserialize<TextoEditResDto>(pResult.Value.ToString());
            return textoRes;
            
            
        }

       public async Task<List<TextosGetAllResDto>> GetTextosAllAsync(TextosGetAllReqDto param)
        {
            return await _context.Database.SqlQuery<TextosGetAllResDto>($"TextosGetAll @UsuarioId={param.usuarioId}").ToListAsync();
 
        }

        public void Delete(DeleteTextoDto texto)
        {
            //_context.Database.ExecuteSql($"TareaDelete @Id={tarea.Id},@modifPor={tarea.modifPor}");
        }

        
    }
}