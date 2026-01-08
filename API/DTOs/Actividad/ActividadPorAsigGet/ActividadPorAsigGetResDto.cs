using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Actividad.ActividadPorAsigGet
{
    public class ActividadPorAsigGetResDto
    {
        public int Id { get; set; }
        public int asigId { get; set; }
        public int actvHrs { get; set; }
        public int actvMins { get; set; }
        public int avance { get; set; }
        public DateTime fecha { get; set; }
        public string texto { get; set; }
    }
}