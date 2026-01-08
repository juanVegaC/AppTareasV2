using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Texto.TextoEdit
{
    public class TextoEditReqDto
    {
        public int Id { get; set; }
        public int textoId { get; set; }
        public string idioma { get; set; }  
        public string texto { get; set; }
        public bool borrado { get; set; }
        public int usuarioId { get; set; }
        
    }
}