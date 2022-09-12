using EFCore.Models;
using Services.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IJobApplicationRepository
    {
        JobApplication AddJobApp(JobApplication jobApplication);
        IEnumerable<JobApplication> GetAllJobApps();
        List<string> GetAppStatusTypes();
        JobApplication EditJobApp(JobApplicationEditVM jobApplication);
        JobApplication ViewJobApp(int jobAppId);
        bool DeleteJobApp(JobApplication jobApplication);
        IEnumerable<AppStatusLog> TrackJobAppStatus(int jobAppId);
        bool JobAppClosed(int jobApplicationId);
    }
}
