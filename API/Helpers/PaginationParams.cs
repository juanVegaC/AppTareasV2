using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 5000;
        public int PageNumber {get; set;} = 1;
 
        private int _pageSize = 3;

        public int PageSize {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }        

        public string filterResult { get; set; } = "";
    }        
}