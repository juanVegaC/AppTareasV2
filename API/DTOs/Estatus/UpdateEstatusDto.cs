using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Estatus
{
    public class UpdateEstatusDto
    {
        public int Id { get; set; }
        public string tipo { get; set; }
        public int estatus { get; set; }
        public int textoId { get; set; }
        public int modifPor { get; set; }
        
    }
}