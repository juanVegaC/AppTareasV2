using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TareasPuestoTab.TareasPuestoTabGet
{
    public class TareasPuestoTabGetReqDto
    {
        public int puestoId { get; set; }
        public int tableroId { get; set; }
        public int usuarioId { get; set; }
    }
}