using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.User.UserEdit
{
    public class UserEditReqDto
    {
        [Required] public int Id { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Name { get; set; }
        public string Password { get; set; }       
        public bool Admin { get; set; } 
        public bool Locked { get; set; }
        
    }
}