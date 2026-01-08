using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PuestoTab
    {
        public int Id { get; set; }
        public int puestoId { get; set; }
        public int tableroId { get; set; }
        public bool principal { get; set; }
        public int asignadoPor { get; set; }
        public DateTime asignadoFe { get; set; } = DateTime.UtcNow;
        public int? modifPor { get; set; }        
        public DateTime? modifFe { get; set; } = DateTime.UtcNow;
        public bool borrado { get; set; }

        
    }
}