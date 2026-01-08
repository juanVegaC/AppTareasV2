using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Texto
{
    public class TextoDto
    {
        public int Id { get; set; }
        public int textoId { get; set; }
        public string idioma { get; set; }  
        public string texto { get; set; }
        
    }
}