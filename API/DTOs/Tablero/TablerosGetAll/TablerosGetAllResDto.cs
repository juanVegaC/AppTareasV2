using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tablero.TablerosGetAll
{
    public class TablerosGetAllResDto
    {
        public int Id { get; set; }
        public string nombre { get; set; }
        public int version { get; set; }
        public bool borrado { get; set; }
    }
}
