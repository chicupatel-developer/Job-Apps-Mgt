import http from "../axios/job-application-http-common";

class JobApplicationService {
  addJobApplication = async (data) => {
    return await http.post(`/addJobApplication`, data);
  };

  getAllJobApps = async () => {
    return await http.get(`/getAllJobApps`);
  };

  getAppStatusTypes = async () => {
    return await http.get(`/getAppStatusTypes`);
  };

  viewJobApp = async (jobAppId) => {
    return await http.get(`/viewJobApp/${jobAppId}`);
  };

  editJobApplication = async (data) => {
    return await http.post(`/editJobApplication`, data);
  };

  deleteJobApplication = async (data) => {
    return await http.post(`/deleteJobApplication`, data);
  };
}
export default new JobApplicationService();
