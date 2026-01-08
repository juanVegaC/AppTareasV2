using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TabEstado
{
    public class CreateTabEstadoResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }        
    }
}