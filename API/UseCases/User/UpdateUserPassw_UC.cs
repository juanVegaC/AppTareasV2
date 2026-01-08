using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.User;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace API.UseCases.User
{
    public class UpdateUserPassw_UC
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;


        public UpdateUserPassw_UC(IUnitOfWork unitOfWork, IMapper mapper,UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;

        }

        public async Task<AppUserUpdateResDto> Update(AppUserUpdateReqDto appUser){

            var result = new AppUserUpdateResDto();
            
                               
            try
            {

                result.messages = new List<DbMsgResult>();
                
                if (appUser.usuarioId == 0){  
                    result.messages.Add(new DbMsgResult("E","UserId can't be empty"));
                    return result;
                }

                var userSQL = await _unitOfWork.UserRepository.GetUserByIdAsync(appUser.usuarioId );

                if(userSQL == null){
                    result.messages.Add(new DbMsgResult("E","User doesn´t exists"));
                    return result;

                }

                var currPassOk = await _userManager.CheckPasswordAsync(userSQL, appUser.password);

                if(!currPassOk){
                    result.messages.Add(new DbMsgResult("E","La contraseña no es correcta"));
                    return result;
                }

                if(!string.IsNullOrEmpty(appUser.passwordNew)){
                    userSQL.PasswordHash = _userManager.PasswordHasher.HashPassword(userSQL, appUser.passwordNew);
                }

                _unitOfWork.UserRepository.Update(userSQL);

                await _unitOfWork.Complete();

                result.messages.Add(new DbMsgResult ("S","Se cambio la contraseña"));

                return result;
            }
            catch (System.Exception err)
            {
                result.messages.Add(new DbMsgResult ("E",err.Message));
                return result;
            }                   
        }
        


    }
}