using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Asignacion
{
    public class AsignacionesPorTareaResDto
    {
        public int Id { get; set; }
        public int tareaId { get; set; }
        public int avance { get; set; }
        public decimal tiempoAsig { get; set; }
        public int prioridad { get; set; }
        public DateTime creadoFe { get; set; }
        public int estatus { get; set; }
        public string estatusTxt { get; set; }
        public string nombreUsuario { get; set; }
        public int puestoId { get; set; }
        public string puestoTitulo { get; set; }
        public bool puestoEsPool { get; set; }

    }
}