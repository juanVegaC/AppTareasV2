using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.DTOs.TabEstado.TabEstadosGetAll
{
    public class TabEstadosGetAllResDto
    {
        public int Id { get; set; }
        public int tableroId { get; set; }
        public int estadoId { get; set; }
        public string estado { get; set; }
        public int posicion { get; set; }
        public int poolAsigId { get; set; }
        public string poolAsig { get; set; }
        public int poolAsigTabId { get; set; }
        public string poolAsigTab { get; set; }
        public int poolAsigEdoId { get; set; }
        public string poolAsigEdo { get; set; }
        public bool cierraAsig { get; set; }
        public string asignadoPor { get; set; }
        public DateTime asignadoFe { get; set; }
        public int asigAPuestoId { get; set; }
        public int asigATabId { get; set; }
        public int asigAEdoId { get; set; }
        public string asigAPuesto { get; set; }
        public string asigATab { get; set; }
        public string asigAEdo { get; set; }

    }
}