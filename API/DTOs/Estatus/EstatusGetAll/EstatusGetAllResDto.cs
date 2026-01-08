using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Estatus.EstatusGetAll
{
    public class EstatusGetAllResDto
    {
        public int Id { get; set; }
        public string tipo { get; set; }
        public int estatus { get; set; }
        public int textoId { get; set; }
        public string texto { get; set; }
        public bool borrado { get; set; }        
    }
}