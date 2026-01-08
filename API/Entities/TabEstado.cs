using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class TabEstado
    {
        public int Id { get; set; }
        public int tableroId { get; set; }
        public int estadoId { get; set; }
        public int posicion { get; set; }
        public int asignadoPor { get; set; }
        public DateTime asignadoFe { get; set; } = DateTime.UtcNow;
        public bool borrado { get; set; }

    }
}