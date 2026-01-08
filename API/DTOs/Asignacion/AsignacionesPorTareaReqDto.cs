using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Asignacion
{
    public class AsignacionesPorTareaReqDto
    {
        public int tareaId { get; set; }
        public int usuarioId { get; set; }
        public string ctrl_app_action { get; set; }
    }
}