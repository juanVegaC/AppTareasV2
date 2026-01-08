using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tablero.TableroEdit
{
    public class TableroEditReqDto
    {
        public int Id { get; set; }
        public string nombre { get; set; }
        public int modifPor { get; set; }
        public bool borrado { get; set; }
    }
}