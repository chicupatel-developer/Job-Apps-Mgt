import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:44318/api/JobResume",
  headers: {
    "Content-type": "application/json",
  },
});
