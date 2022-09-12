using System;
using System.Collections.Generic;
using System.Text;

namespace Services.DTO
{
    public class UutGrpByDebitCredit_GL_Number
    {
        public string GL_Number { get; set; }
        public int Debit_Amount { get; set; }
        public int Credit_Amount { get; set; }
    }
}
