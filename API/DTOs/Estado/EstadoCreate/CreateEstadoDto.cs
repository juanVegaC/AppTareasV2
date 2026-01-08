using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Estado
{
    public class CreateEstadoDto
    {
        public string estado { get; set; }
        public int creadoPor { get; set; }
        
    }
}