using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Actividad
{
    public class CreateActividadResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }
        
    }
}