using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPICore.DTO
{
    public class APIResponse
    {
        public int ResponseCode { get; set; }
        public string ResponseMessage { get; set; }
    }
}
