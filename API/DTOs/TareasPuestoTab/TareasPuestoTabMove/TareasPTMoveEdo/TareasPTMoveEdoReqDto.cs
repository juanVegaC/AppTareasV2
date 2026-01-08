using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TareasPuestoTab.TareasPuestoTabMove.TareasPTMoveEdo
{
    public class TareasPTMoveEdoReqDto
    {
        public int asigId { get; set; }     
        public int puestoIdNew { get; set; }   
        public int tableroIdNew { get; set; }
        public int estadoIdNew { get; set; }
        public int estadoPosNew { get; set; }
        public int usuarioId { get; set; }
    }
}

       