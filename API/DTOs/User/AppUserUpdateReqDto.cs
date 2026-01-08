using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.User
{
    public class AppUserUpdateReqDto
    {
        public int usuarioId { get; set; }
        public string password { get; set; }
        public string passwordNew { get; set; }
        public string passwordNewConf { get; set; }
        public string ctrl_app_action { get; set; }

    }
}