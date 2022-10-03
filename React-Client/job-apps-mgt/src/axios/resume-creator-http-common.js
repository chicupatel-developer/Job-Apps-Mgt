import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44318/api/ResumeCreator",
  headers: {
    "Content-type": "application/json",
    // "Content-type": "application/pdf",
  },
});
