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
}
export default new JobApplicationService();
