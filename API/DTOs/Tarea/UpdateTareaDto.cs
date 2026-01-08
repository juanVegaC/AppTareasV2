using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateTareaDto
    {
        public int Id { get; set; }
        public string numero { get; set; }
        public string texto { get; set; }
        public string docuUrl { get; set; }  
        public int asigId { get; set; }
        public int prioridad { get; set; }
        public int puestoId { get; set; }
        public int newPuestoId { get; set; }
        public int modifPor { get; set; }
        public string ctrl_app_action { get; set; }      
    }
}