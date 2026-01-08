using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs.Texto.TextoEdit
{
    public class TextoEditResDto
    {
        public ICollection<DbMsgResult> messages { get; set; }
    }
}