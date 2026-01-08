using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TareaDto
    {
        public int Id { get; set; }
        public string numero { get; set; }
        public string texto { get; set; }
        public string docuUrl { get; set; }
        public int asignadoA { get; set; }
        public int estatusId { get; set; }
        public int creadaPor { get; set; }
        public DateTime creadaFe { get; set; } = DateTime.UtcNow;
        public DateTime modifFe { get; set; } = DateTime.UtcNow;
        public bool borrada { get; set; }
        
    }
}