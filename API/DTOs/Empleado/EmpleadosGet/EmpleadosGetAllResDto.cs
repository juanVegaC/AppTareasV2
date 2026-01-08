using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.DTOs.Empleado.EmpleadosGet
{
    public class EmpleadosGetAllResDto
    {
        public int Id { get; set; }
        public int puestoId { get; set; }
        public string   puesto_titulo { get; set; }
        public int userId { get; set; }
        public string usuario_name { get; set; }
        public bool principal { get; set; }
        public bool borrado { get; set; }
        public DateTime validoDesde { get; set; }
        public DateTime validoHasta { get; set; }
    }
}