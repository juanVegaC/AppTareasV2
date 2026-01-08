using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.User;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace API.Data
{
    public class UserRepository: IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
         public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }
         public async Task<MemberDto> GetMemberSPAsync(string username)
        {
            var result = await _context.Database.SqlQuery<MemberDto>($"UserGetPorUsername @Username={username}").ToListAsync();

            if (result.Count > 0){
                return result[0];
            }
            return null;
        }

        public async Task<IEnumerable<AppUserGetAllResDto>> GetAllUsersAsync(AppUserGetAllReqDto param)
        {
            return await _context.Database.SqlQuery<AppUserGetAllResDto>($"UsuariosGetAll @UsuarioId={param.usuarioId}").ToListAsync();

        }

         public async Task<IEnumerable<MemberDto>> GetAllMembersAsync()
        {
            return await _context.Users
            .OrderBy(x => x.UserName)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<AppUserDto> GetUserByUsernameExtendAsync(string username)
        {
            var parUsername = new SqlParameter("@Username", username);
            var parName = new SqlParameter("@Name", "");
                parName.Direction = ParameterDirection.Output;
                parName.Size = 50;
                parName.DbType = DbType.String;

            var parameters = new List<SqlParameter>();
            parameters.Add(parUsername);
            parameters.Add(parName);


            var result = await _context.Database.ExecuteSqlRawAsync("exec UserGetPorUsername @Username=@Username,@Name=@Name OUTPUT",parameters.ToArray());  
            return new AppUserDto();
            //var x = result.FirstOrDefault();
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }        
    }
}