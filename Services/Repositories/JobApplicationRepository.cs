using EFCore.Context;
using EFCore.Models;
using Services.DTO;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly JobAppsDBContext appDbContext;

        public JobApplicationRepository(JobAppsDBContext appDbContext)
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

        public JobApplication AddJobApp(JobApplication jobApplication)
        {
            using var transaction = appDbContext.Database.BeginTransaction();
            try
            {
                // 1)
                var result = appDbContext.JobApplications.Add(jobApplication);
                appDbContext.SaveChanges();

                // throw new Exception();

                // 2)
                AppStatusLog appStatusLog = new AppStatusLog()
                {
                    AppStatusChangedOn = result.Entity.AppliedOn,
                    JobApplicationId = result.Entity.JobApplicationId,
                    AppStatus = 0
                };
                appDbContext.AppStatusLog.Add(appStatusLog);
                appDbContext.SaveChanges();

                // commit 1 & 2
                transaction.Commit();
                return result.Entity;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new Exception();
            }
        }

        public IEnumerable<JobApplication> GetAllJobApps()
        {
            var jobApps = appDbContext.JobApplications;
            if (jobApps != null)
                return jobApps;
            else
                return new List<JobApplication>();
        }

        public List<string> GetAppStatusTypes()
        {
            List<string> appStatusTypes = new List<string>();
            foreach (string appStatusType in Enum.GetNames(typeof(AppStatusType)))
            {
                appStatusTypes.Add(appStatusType);
            }
            return appStatusTypes;
        }

        public JobApplication EditJobApp(JobApplicationEditVM jobApplication)
        {            
            // throw new Exception();          

            using var transaction = appDbContext.Database.BeginTransaction();
            try
            {
                var jobApp_ = appDbContext.JobApplications
                          .Where(x => x.JobApplicationId == jobApplication.JobApplication.JobApplicationId).FirstOrDefault();
                if (jobApp_ != null)
                {
                    // 1) edit JobApplications db table
                    jobApp_.PhoneNumber = jobApplication.JobApplication.PhoneNumber;
                    jobApp_.Province = jobApplication.JobApplication.Province;
                    jobApp_.WebURL = jobApplication.JobApplication.WebURL;
                    jobApp_.FollowUpNotes = jobApplication.JobApplication.FollowUpNotes;
                    jobApp_.ContactPersonName = jobApplication.JobApplication.ContactPersonName;
                    jobApp_.ContactEmail = jobApplication.JobApplication.ContactEmail;
                    jobApp_.CompanyName = jobApplication.JobApplication.CompanyName;
                    jobApp_.City = jobApplication.JobApplication.City;
                    jobApp_.AppStatus = jobApplication.JobApplication.AppStatus;
                    jobApp_.AppliedOn = jobApplication.JobApplication.AppliedOn;
                    jobApp_.AgencyName = jobApplication.JobApplication.AgencyName;
                    appDbContext.SaveChanges();


                    // throw new Exception();

                    // 2) add into AppStatusLog db table
                    if (jobApplication.AppStatusChanged)
                    {
                        AppStatusLog appStatusLog = new AppStatusLog()
                        {
                            AppStatusChangedOn = jobApplication.AppStatusChangedOn,
                            JobApplicationId = jobApp_.JobApplicationId,
                            AppStatus = jobApplication.JobApplication.AppStatus
                        };
                        appDbContext.AppStatusLog.Add(appStatusLog);
                        appDbContext.SaveChanges();
                    }

                    // commit 1 &&/|| 2
                    transaction.Commit();

                    return jobApplication.JobApplication;
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw new Exception();
            }
        }

        public JobApplication ViewJobApp(int jobAppId)
        {
            // check for exception
            // throw new Exception();

            JobApplication jobApplication = new JobApplication();

            jobApplication = appDbContext.JobApplications
                                .Where(x => x.JobApplicationId == jobAppId).FirstOrDefault();

            return jobApplication;
        }

        public bool DeleteJobApp(JobApplication jobApplication)
        {
            try
            {
                // check for exception
                // throw new Exception();

                appDbContext.JobApplications.RemoveRange(appDbContext.JobApplications.Where(x => x.JobApplicationId == jobApplication.JobApplicationId).ToList());
                appDbContext.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public IEnumerable<AppStatusLog> TrackJobAppStatus(int jobAppId)
        {
            List<AppStatusLog> appStatusLog = new List<AppStatusLog>();

            var appStatusLog_ = appDbContext.AppStatusLog
                            .Where(x => x.JobApplicationId == jobAppId);
            if (appStatusLog_ != null && appStatusLog_.Count() > 0)
            {
                appStatusLog = appStatusLog_.ToList();
            }
            return appStatusLog;
        }
    }
}