using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.User.UserEdit
{
    public class UserEditResDto
    {
       public ICollection<DbMsgResult> messages { get; set; }
         
    }
}