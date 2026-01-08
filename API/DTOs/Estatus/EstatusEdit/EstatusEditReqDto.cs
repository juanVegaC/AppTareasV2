using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Estatus.EstatusEdit
{
    public class EstatusEditReqDto
    {
        public int Id { get; set; }
       public string tipo { get; set; }
        public int estatus { get; set; }
        public int textoId { get; set; }
        public int modifPor { get; set; }
        public bool borrado { get; set; }
         
    }
}