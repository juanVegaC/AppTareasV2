using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Puesto.PuestoCreate
{
    public class CreatePuestoResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }
    }
}