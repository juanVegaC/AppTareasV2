using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Estado
{
    public class CreateEstadoResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }        
    }
}