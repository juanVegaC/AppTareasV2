using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tablero
{
    public class CreateTableroResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }
        
    }
}