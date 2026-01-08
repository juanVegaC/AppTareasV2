using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TabEstado.PuestoTabEdit
{
    public class PuestoTabEditResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }        
    }
}