using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Puesto
{
    public class UpdatePuestoDto
    {
        public int Id { get; set; }
        public string titulo { get; set; }
        public int modifPor { get; set; }
        
    }
}