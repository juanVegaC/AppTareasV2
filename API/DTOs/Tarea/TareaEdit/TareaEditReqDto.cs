using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tarea
{
    public class TareaEditReqDto
    {
        public int Id { get; set; }
        public string numero { get; set; }
        public string texto { get; set; }
        public string docuUrl { get; set; }  
        public int modifPor { get; set; }
        public string ctrl_app_action { get; set; }      
        
    }
}