using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Empleado.EmpleadoEdit
{
    public class EmpleadoEditReqDto
    {
        public int Id { get; set; }
       public int userId { get; set; }
        public int puestoId { get; set; }
        public DateTime validoDesde { get; set; }
        public DateTime validoHasta { get; set; }
        public int modifPor { get; set; }
        public bool principal { get; set; }
        public bool borrado { get; set; }
         
    }
}