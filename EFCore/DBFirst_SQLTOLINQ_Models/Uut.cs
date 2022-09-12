using System;
using System.Collections.Generic;

namespace EFCore.DBFirst_SQLTOLINQ_Models
{
    public partial class Uut
    {
        public int Uutid { get; set; }
        public string DebitGlNumber { get; set; }
        public string CreditGlNumber { get; set; }
        public int? DebitAmount { get; set; }
        public int? CreditAmount { get; set; }
    }
}
