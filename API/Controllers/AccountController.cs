using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.DTOs.User.UserCreate;
using API.DTOs.User.UserEdit;
using API.DTOs.User.UserLogin;

namespace API.Controllers
{
    public class AccountController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(IUnitOfWork unitOfWork,UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _tokenService = tokenService;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserCreateResDto>> Register(UserCreateReqDto registerDto)
        {
            var result = new UserCreateResDto();
            result.messages = new List<DbMsgResult>();

            if (await UserExists(registerDto.Username)){

                result.messages.Add(new DbMsgResult("E","El usuario ya existe"));
                return result;
                //return BadRequest("Username is taken");
            } 

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result2 = await _userManager.CreateAsync(user, registerDto.Password);

            if (result2.Succeeded){
                result.messages.Add(new DbMsgResult("S","Se creo el usuario"));

            } else{
                foreach(var msg in result2.Errors){
                    result.messages.Add(new DbMsgResult("E",msg.Description.ToString()));
                }
            }

            return result;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            //var result = new UserLoginResDto();

            var user = await _userManager.Users
                .SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username");

            if(user.Locked)return Unauthorized("El usuario esta bloqueado");

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!result) return Unauthorized();

            //return result;
             return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
            };
       
  }

        [HttpPost("editUser")]
        public async Task<ActionResult<UserEditResDto>> EditUser(UserEditReqDto userEditDto)
        {
            var result = new UserEditResDto();
            result.messages = new List<DbMsgResult>();

            var userSQL = await _unitOfWork.UserRepository.GetUserByIdAsync(userEditDto.Id );

            if(userSQL == null){
                result.messages.Add(new DbMsgResult("E","El usuario no existe"));
                return result;
            }

            if(userSQL.UserName != userEditDto.Username.ToLower()){
                if (await UserExists(userEditDto.Username)){

                    result.messages.Add(new DbMsgResult("E","El usuario ya existe"));
                    return result;
                }                 
            }

            if(!string.IsNullOrEmpty(userEditDto.Password)){
                userSQL.PasswordHash = _userManager.PasswordHasher.HashPassword(userSQL, userEditDto.Password);
            }

            userSQL.UserName = userEditDto.Username.ToLower();
            userSQL.Name = userEditDto.Name;
            userSQL.Admin = userEditDto.Admin;
            userSQL.Locked = userEditDto.Locked;

            var result2 = await _userManager.UpdateAsync(userSQL);
            if (result2.Succeeded){
                result.messages.Add(new DbMsgResult("S","Se actualizo el usuario"));

            } else{
                foreach(var msg in result2.Errors){
                    result.messages.Add(new DbMsgResult("E",msg.Description.ToString()));
                }
            }


            //_unitOfWork.UserRepository.Update(userSQL);

            //var res = await _unitOfWork.Complete();


            return result;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
       
    }
}