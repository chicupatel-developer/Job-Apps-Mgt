import http from "../axios/job-resume-http-common";

class JobResumeService {
  upload(file, jobApplicationId, onUploadProgress) {
    let formData = new FormData();

    formData.append("resumeFile", file);
    formData.append("jobApplicationId", jobApplicationId.toString());

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  download = async (jobApplicationId) => {
    return await http.get(`/download/${jobApplicationId}`, {     
      responseType: "blob",
      // "Content-Type": "application/pdf",
    });
  };
}
export default new JobResumeService();
