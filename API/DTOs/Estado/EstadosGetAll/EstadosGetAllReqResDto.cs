using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API.DTOs.Estado.EstadosGetAll
{
    public class EstadosGetAllResDto
    {
        public int Id { get; set; }
        public string estado { get; set; }
    }
}