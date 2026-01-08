using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Asignacion
{
    public class AsignacionPriorUpdatedDto
    {
        public int Id { get; set; }
        public int prioridad { get; set; }
        public int prioridadNew { get; set; }
    }
}