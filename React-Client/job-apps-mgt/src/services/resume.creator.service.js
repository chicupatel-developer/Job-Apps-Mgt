import http from "../axios/resume-creator-http-common";

class ResumeCreatorService {
  createAndDownloadResume = async (data) => {
    return await http.post(`/createAndDownloadResume`, data);
  };
}
export default new ResumeCreatorService();
