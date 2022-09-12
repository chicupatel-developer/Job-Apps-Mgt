using System;
using System.Collections.Generic;

namespace EFCore.DBFirst_SQLTOLINQ_Models
{
    public partial class Uwuser
    {
        public int UwuserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
