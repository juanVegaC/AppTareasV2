using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Tablero.TableroEdit
{
    public class TableroEditResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }
        
    }
}