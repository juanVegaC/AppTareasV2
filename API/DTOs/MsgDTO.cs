using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MsgDTO
    {
        public MsgDTO(string type, string text, int secu = 0, int num = 0)
        {
            this.type = type;
            this.text = text;
            this.secu = secu;
            this.num = num;
        }

        public string type { get; set; }
        public string text { get; set; }
        public int secu { get; set; }
        public int num { get; set; }
         
    }
}