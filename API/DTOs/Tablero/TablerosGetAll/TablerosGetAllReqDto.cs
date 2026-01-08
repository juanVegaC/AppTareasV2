using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tablero.TablerosGetAll
{
    public class TablerosGetAllReqDto
    {
        public int Id { get; set; }
        public int usuarioId { get; set; }
    }
}