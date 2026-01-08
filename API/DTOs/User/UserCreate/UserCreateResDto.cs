using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.User.UserCreate
{
    public class UserCreateResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }
    }
}