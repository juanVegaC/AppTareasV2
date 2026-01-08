using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class DbMsgResult
    {
        public DbMsgResult(string type, string text)
        {
            this.type = type;
            this.text = text;
        }

        public string type { get; set; }
        public string text { get; set; }
    }
}