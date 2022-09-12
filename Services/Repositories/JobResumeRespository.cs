using EFCore.Context;
using System;
using System.Collections.Generic;
using System.Text;
using Services.Interfaces;
using EFCore.Models;
using System.Data.SqlClient;
using System.Data.Entity.Core;
using System.Linq;

namespace Services.Repositories
{
    public class JobResumeRepository : IJobResumeRepository
    {
        private readonly JobAppsDBContext appDbContext;

        public JobResumeRepository(JobAppsDBContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public bool JobAppClosed(int jobApplicationId)
        {
            var lastAppStatusLog = appDbContext.AppStatusLog
                                   .Where(x => x.JobApplicationId == jobApplicationId);
            if (lastAppStatusLog != null && lastAppStatusLog.Count() > 0)
            {
                var lastAppStatusLog_ = lastAppStatusLog.ToList().LastOrDefault();
                if (lastAppStatusLog_.AppStatus == AppStatusType.Closed)
                {
                    return true;
                }
            }
            return false;
        }

        public bool StoreResumeFile(JobResume jobResume)
        {
            try
            {
                // check for exception
                // throw new Exception();

                // key(column) : JobApplicationId 
                // Table : JobResumes
                // if record exist then overwrite record
                // else just add record

                var jobResume_ = appDbContext.JobResumes
                                    .Where(x => x.JobApplicationId == jobResume.JobApplicationId).FirstOrDefault();
                if (jobResume_ != null)
                {
                    // overwrite
                    jobResume_.FileName = jobResume.FileName;
                    jobResume_.FilePath = jobResume.FilePath;
                }
                else
                {
                    // add
                    var result = appDbContext.JobResumes.Add(jobResume);
                }             
                appDbContext.SaveChanges();
                return true;
            }        
            catch (Exception ex)
            {
                return false;
            }
        }

        public string GetResumeFile(int jobApplicationId)
        {
            string resumeFileName = null;

            var jobResume = appDbContext.JobResumes
                                .Where(x => x.JobApplicationId == jobApplicationId).FirstOrDefault();
            if(jobResume!=null)
                resumeFileName = jobResume.FileName;

            return resumeFileName;
        }
    }
}
