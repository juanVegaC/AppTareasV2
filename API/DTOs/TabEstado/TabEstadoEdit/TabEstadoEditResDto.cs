using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TabEstado.TabEstadoEdit
{
    public class TabEstadoEditResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }        
    }
}