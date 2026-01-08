using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tarea
{
    public class CreateTareaResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }

    }
}