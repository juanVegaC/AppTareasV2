using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Puesto.PuestosGetAll
{
    public class PuestosGetAllResDto
    {
        public int Id { get; set; }
        public string titulo { get; set; }
        public bool borrado { get; set; }   
        public int puestoSupId { get; set; }
        public string puestoSupTitulo { get; set; }
        public bool publico { get; set; }       

    }
}