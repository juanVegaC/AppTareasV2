using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Texto
{
    public class CreateTextoResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }
        
    }
}