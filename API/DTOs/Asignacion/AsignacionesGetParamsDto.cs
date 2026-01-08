using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Asignacion
{
    public class AsignacionesGetParamsDto
    {
        public string ctrl_app_action { get; set; }
        public int usuarioId { get; set; }
        
    }
}