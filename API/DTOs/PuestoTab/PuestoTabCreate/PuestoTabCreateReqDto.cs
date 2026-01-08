using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TabEstado.PuestoTabCreate
{
    public class PuestoTabCreateReqDto
    {
        public int puestoId { get; set; }
        public int tableroId { get; set; }
        public bool principal { get; set; }
        public int asignadoPor { get; set; }

        
    }
}