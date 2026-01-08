using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Filters
{
    public class FilterTareasDto
    {
        public string type { get; set; }
        public string puestoId { get; set; } 
        public int usuarioId { get; set; }       
    }
}