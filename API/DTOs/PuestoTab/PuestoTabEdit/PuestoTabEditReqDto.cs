using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TabEstado.PuestoTabEdit
{
    public class PuestoTabEditReqDto
    {
        public int id { get; set; }
        public int puestoId { get; set; }
        public int tableroId { get; set; }
        public bool principal { get; set; }
        public int modifPor { get; set; }
        public bool borrado { get; set; }

        
    }
}