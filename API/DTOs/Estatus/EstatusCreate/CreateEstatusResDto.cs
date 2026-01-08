using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Estatus
{
    public class CreateEstatusResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }        
    }
}