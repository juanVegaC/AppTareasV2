using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.User.UserLogin
{
    public class UserLoginResDto
    {
        public string Username { get; set; }
        public string Token { get; set; }    
        public ICollection<DbMsgResult> messages { get; set; }    
    }
}