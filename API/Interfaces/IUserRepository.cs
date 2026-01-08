using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.User;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<AppUserDto> GetUserByUsernameExtendAsync(string username);
        Task<IEnumerable<MemberDto>> GetAllMembersAsync();
        Task<IEnumerable<AppUserGetAllResDto>> GetAllUsersAsync(AppUserGetAllReqDto param);

        //Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string username);        
        Task<MemberDto> GetMemberSPAsync(string username);        
    }
}