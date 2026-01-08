using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.User;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.UseCases.User;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  //[Authorize]
    public class UsersController: BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        
        public UsersController(IUnitOfWork unitOfWork, IMapper mapper,
                               UserManager<AppUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;

        }

        // public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery]UserParams userParams)

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUserGetAllResDto>>> GetUsers()
        {

            var param = new AppUserGetAllReqDto();

            param.usuarioId = User.GetUserId();

            // userParams.CurrentUsername = User.GetUsername();

            var users = await _unitOfWork.UserRepository.GetAllUsersAsync(param);

            // Response.AddPaginationHeader(users.CurrentPage, users.PageSize, 
            //                             users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        //[Authorize(Roles="AppUser")]
        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
          return  await _unitOfWork.UserRepository.GetMemberSPAsync(username); 
        }

        [HttpPut]
        public async Task<ActionResult<Object>> UpdateUser(AppUserEditParamsDto UserDto){

          var updateUserPassw = new UpdateUserPassw_UC(_unitOfWork,_mapper,_userManager);

          var paramUserDto = _mapper.Map<AppUserUpdateReqDto>(UserDto); 

          paramUserDto.usuarioId = User.GetUserId();

          
          if(paramUserDto == null)
            return BadRequest("NO tareaData!!");
          if(paramUserDto.ctrl_app_action == "CHANGE_PASSWORD"){
            
            var result = await updateUserPassw.Update(paramUserDto);

            return result;
          }else{
            return BadRequest("NO UseCase FOUND!!");
          }


        }
    
     }
}