using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Estado
    {
        public int Id { get; set; }
        public string estado { get; set; }
        public int creadoPor { get; set; }
        public bool borrado { get; set; }

    }
}