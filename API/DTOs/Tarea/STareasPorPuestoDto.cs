using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tarea
{
    public class STareasPorPuestoDto
    {

        public int Id { get; set; }
        public string numero { get; set; }
        public string texto { get; set; }
        public string docuUrl { get; set; }
        public int puestoId { get; set; }
        public int estatus { get; set; }
        public string estatusTxt { get; set; }
        public int asigId { get; set; }
        public int prioridad { get; set; }
        public int asignadoA { get; set; }
        public DateTime asignadoFe { get; set; }
        public string asignadoANombre { get; set; }
        public string asignadoAPuesto { get; set; }
        public int asigIdPuesto { get; set; }
        public int puestoIdPuesto { get; set; }
        public int prioridadPuesto { get; set; }
        public int avancePuesto { get; set; }
/*         public string asigName { get; set; }
        public string creaName { get; set; }
        */
         
        public int avance { get; set; }
        public int asigCount { get; set; }
        public bool miTarea { get; set; }
        public bool miAsignacion { get; set; }

    }
}