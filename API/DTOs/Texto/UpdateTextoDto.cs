using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Texto
{
    public class UpdateTextoDto
    {
        public int Id { get; set; }
        public string idioma { get; set; }  
        public string texto { get; set; }
        public int? modifPor { get; set; }
        
    }
}