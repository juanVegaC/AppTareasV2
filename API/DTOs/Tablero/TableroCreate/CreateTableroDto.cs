using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tablero
{
    public class CreateTableroDto
    {
        public string nombre { get; set; }
        public int creadoPor { get; set; }
    }
}