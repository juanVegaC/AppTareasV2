using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Puesto
{
    public class CreatePuestoDto
    {
        public string titulo { get; set; }
        public int? puestoSupId { get; set; }
        public bool publico { get; set; }
        public int creadoPor { get; set; }
        
    }
}