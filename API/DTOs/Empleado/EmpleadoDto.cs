using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Empleado
{
    public class EmpleadoDto
    {
        public int Id { get; set; }
        public int userId { get; set; }
        public int puestoId { get; set; }
        public bool principal { get; set; }
        public DateTime validoDesde { get; set; }
        public DateTime validoHasta { get; set; }
        public int creadoPor { get; set; }
        public int? modifPor { get; set; }
        public DateTime creadoFe { get; set; } = DateTime.UtcNow;
        public DateTime? modifFe { get; set; } = DateTime.UtcNow;
        public bool borrado { get; set; }        
    }
}