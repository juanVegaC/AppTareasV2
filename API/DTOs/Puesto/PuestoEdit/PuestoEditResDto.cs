using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Puesto.PuestoEdit
{
    public class PuestoEditResDto
    {
         public ICollection<DbMsgResult> messages { get; set; }
    }
}