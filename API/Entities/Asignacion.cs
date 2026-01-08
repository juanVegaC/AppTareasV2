using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Asignacion
    {
        public int Id { get; set; }
        public int tareaId { get; set; }
        public int puestoId { get; set; }
        public int estatus { get; set; }
        public int prioridad { get; set; }
        public int avance { get; set; }
        public int asigPrev { get; set; }
        public decimal tiempoAsig { get; set; }
        public int creadoPor { get; set; }
        public int? modifPor { get; set; }
        public DateTime creadoFe { get; set; } = DateTime.UtcNow;
        public DateTime? modifFe { get; set; } = DateTime.UtcNow;
        public bool borrado { get; set; }
        
    }
}