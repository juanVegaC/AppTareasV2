using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Empleado.EmpleadoEdit
{
    public class EmpleadoEditResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }        
    }
}