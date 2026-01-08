using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Tarea
    {
        public int Id { get; set; }
        public string numero { get; set; }
        public string texto { get; set; }
        public string docuUrl { get; set; }
        public int asignacionId { get; set; }
        public int asignadoA { get; set; }
        public DateTime asignadoFe { get; set; } = DateTime.UtcNow;
        public int estatusId { get; set; }
        public int creadoPor { get; set; }
        public int? modifPor { get; set; }
        public DateTime creadoFe { get; set; } = DateTime.UtcNow;
        public DateTime? modifFe { get; set; } = DateTime.UtcNow;
        public bool borrado { get; set; }

    }
}