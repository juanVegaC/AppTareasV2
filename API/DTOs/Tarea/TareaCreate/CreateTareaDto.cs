using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateTareaDto
    {
        public string numero { get; set; }
        public string texto { get; set; }
        public string docuUrl { get; set; }
        public int creadoPor { get; set; }
        public int asignadoA { get; set; }
        public int tableroId { get; set; }
        
    }
}