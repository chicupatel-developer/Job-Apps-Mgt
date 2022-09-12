using System;
using System.Collections.Generic;
using System.Text;

namespace EFCore.Models
{
    public class UserResumeCreate
    {
        public int UserResumeCreateId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserIPAddress { get; set; }
        public DateTime ResumeCreatedAt { get; set; }
    }
}
