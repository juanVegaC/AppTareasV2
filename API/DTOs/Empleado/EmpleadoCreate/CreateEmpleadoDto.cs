using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Empleado
{
    public class CreateEmpleadoDto
    {
        public int userId { get; set; }
        public int puestoId { get; set; }
        public DateTime validoDesde { get; set; }
        public DateTime validoHasta { get; set; }
        public int creadoPor { get; set; }
        public bool principal { get; set; }
        
    }
}