using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TareasPuestoTab.TareasPuestoTabGet
{
    public class TareasPuestoTabGetResDto
    {
        public int tareaId { get; set; }
        public string numero { get; set; }
        public string texto { get; set; }
        public int asigId { get; set; }
        public int puestoId { get; set; }
        public int tableroId { get; set; }
        public int estadoId { get; set; }
        public string estado { get; set; }
        public int estadoPos { get; set; }
        public int prioridad { get; set; }
        public int avance { get; set; } 
        public int edoDias { get; set; }    
        public int edoHoras { get; set; }
        public int edoMinutos { get; set; }
        public int actvHoras { get; set; }
        public int actvMinutos { get; set; }
        public int asignadoAUsrId { get; set; }
        public string asignadoANombre { get; set; }
        public int tipoAsig { get; set; }
    }
}
