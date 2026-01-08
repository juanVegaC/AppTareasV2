using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Puesto
{
    public class PuestoPorUsuarioDto
    {
        public int usuarioId { get; set; }
        public string usuario { get; set; }
        public string nombre { get; set; }
        public int empleadoId { get; set; }
        public int puestoId { get; set; }
        public string puestoTitulo { get; set; }
        public bool principal { get; set; }
        public bool puestoPropio { get; set; }
        public bool esPool { get; set; }
    }
}