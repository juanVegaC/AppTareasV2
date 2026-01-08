using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TabEstado.PuestoTabCreate
{
    public class PuestoTabCreateResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }        
    }
}