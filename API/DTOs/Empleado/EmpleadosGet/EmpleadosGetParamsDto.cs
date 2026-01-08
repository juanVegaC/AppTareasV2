using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Empleado.EmpleadosGet
{
    public class EmpleadosGetParamsDto
    {

        public string ctrl_app_action { get; set; }
        public int usuarioId { get; set; }
        
    }
}