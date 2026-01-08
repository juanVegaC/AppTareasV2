using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Texto
{
    public class CreateTextoDto
    {
        public int textoId { get; set; }
        public string idioma { get; set; }  
        public string texto { get; set; }
        public int creadoPor { get; set; }

    }
}