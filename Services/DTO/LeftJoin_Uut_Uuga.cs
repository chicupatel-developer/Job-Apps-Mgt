using System;
using System.Collections.Generic;
using System.Text;

namespace Services.DTO
{
    public class LeftJoin_Uut_Uuga
    {
        public string GL_Number { get; set; }
        public int Debit_Amount { get; set; }
        public int Credit_Amount { get; set; }
        public int Net_Amount { get; set; }
        public string Chrt_Acct_Desc { get; set; }
    }
}
