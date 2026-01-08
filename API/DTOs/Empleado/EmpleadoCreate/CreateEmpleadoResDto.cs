using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Empleado.EmpleadoCreate
{
    public class CreateEmpleadoResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }
    }
}