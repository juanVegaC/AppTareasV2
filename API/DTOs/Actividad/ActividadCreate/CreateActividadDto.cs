using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Actividad
{
    public class CreateActividadDto
    {
        public int asigId { get; set; }
        public DateTime fecha { get; set; }
        public string texto { get; set; }
        public int avance { get; set; }
        public int actvHrs { get; set; }
        public int actvMins { get; set; }
        public int estatus { get; set; }
        public int creadoPor { get; set; }
        public int newPuestoId { get; set; }
        
    }
}