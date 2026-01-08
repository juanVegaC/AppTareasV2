using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.User.UserCreate
{
    public class UserCreateReqDto
    {
        [Required] public string Username { get; set; }
        [Required] public string Name { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4)]
        public string Password { get; set; }        
    }        
}