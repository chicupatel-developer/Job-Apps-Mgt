using EFCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IJobResumeRepository
    {     
        bool StoreResumeFile(JobResume jobResume);
        string GetResumeFile(int jobApplicationId);
        bool JobAppClosed(int jobApplicationId);
    }
}
