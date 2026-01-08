using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TabEstado
{
    public class CreateTabEstadoDto
    {
        public int tableroId { get; set; }
        public int estadoId { get; set; }
        public int posicion { get; set; }
        public int asignadoPor { get; set; }
        
        
        
    }
}