using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tarea
{
    public class AsignaTareaDto
    {
        public int Id { get; set; }
        public int asigId { get; set; }
        public int puestoId { get; set; }
        public int newPuestoId { get; set; }
        public int modifPor { get; set; }        
        
    }
}