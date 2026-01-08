using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tarea
{
    public class UpdateTareaPriorDto
    {
        public int asigId { get; set; }
        public int prioridad { get; set; }
        public int modifPor { get; set; }
        public string ctrl_app_action { get; set; }
    }
}