import http from "../axios/resume-creator-http-common";

class ResumeCreatorService {
  createAndDownloadResume = async (data) => {
    return await http.post(`/createAndDownloadResume`, data, {
      responseType: "blob",
      // "Content-Type": "application/pdf",
    });
  };

  createAndEmailResume = async (data) => {
    return await http.post(`/createAndEmailResume`, data);
  };
}
export default new ResumeCreatorService();
