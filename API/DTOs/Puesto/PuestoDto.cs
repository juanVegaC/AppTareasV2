using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Puesto
{
    public class PuestoDto
    {
        public int Id { get; set; }
        public string titulo { get; set; }
        public int? puestoSupId { get; set; }
        public int creadoPor { get; set; }
        public int? modifPor { get; set; }
        public DateTime creadoFe { get; set; } = DateTime.UtcNow;
        public DateTime? modifFe { get; set; } = DateTime.UtcNow;
        public bool borrado { get; set; }
        
    }
}