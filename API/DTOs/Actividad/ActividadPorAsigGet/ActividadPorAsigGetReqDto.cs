using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Actividad.ActividadPorAsigGet
{
    public class ActividadPorAsigGetReqDto
    {
        public int asigId { get; set; }
        public int usuarioId { get; set; }
        
    }
}