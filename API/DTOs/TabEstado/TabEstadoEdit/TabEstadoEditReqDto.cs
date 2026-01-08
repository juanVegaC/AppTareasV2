using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.TabEstado.TabEstadoEdit
{
    public class TabEstadoEditReqDto
    {
        public int Id { get; set; }
        public int tableroId { get; set; }
        public int estadoId { get; set; }
        public int posicion { get; set; }
        public int poolAsigId { get; set; }
        public int poolAsigTabId { get; set; }
        public int poolAsigEdoId { get; set; }
        public bool cierraAsig { get; set; }
        public int modifPor { get; set; }
        public int asigAPuestoId { get; set; }
        public int asigATabId { get; set; }
        public int asigAEdoId { get; set; }
        
        
    }
}