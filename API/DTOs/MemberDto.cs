using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public String  username { get; set; }
        public string name { get; set; }
        public string puesto { get; set; }
        public int puestoId { get; set; }
        public bool Admin { get; set; }
    }
}