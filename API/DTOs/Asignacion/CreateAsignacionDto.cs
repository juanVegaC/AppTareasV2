using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Asignacion
{
    public class CreateAsignacionDto
    {
        public int tareaId { get; set; }
        public int puestoId { get; set; }
        public int newPuestoId { get; set; }
        public int creadaPor { get; set; }
        
    }
}