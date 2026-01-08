using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Actividad
    {
        public int Id { get; set; }
        public int asigId { get; set; }
        public DateTime fecha { get; set; }
        public string texto { get; set; }
        public int avance { get; set; }
        public int actvHrs { get; set; }
        public int actvMins { get; set; }
        public int estatus { get; set; }
        public int creadoPor { get; set; }
        public int? modifPor { get; set; }
        public DateTime creadoFe { get; set; } = DateTime.UtcNow;
        public DateTime? modifFe { get; set; } = DateTime.UtcNow;
        public bool borrado { get; set; }

    }
}