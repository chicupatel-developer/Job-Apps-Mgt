import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/pages/Home";
import Apply_To_Job from "./Components/pages/Apply_To_Job";
import Follow_Up from "./Components/pages/Follow_Up";
import Upload_Resume from "./Components/pages/Upload_Resume";
import Resume_Creator from "./Components/pages/Resume_Creator";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/apply-job" element={<Apply_To_Job />} />
        <Route path="/follow-up" element={<Follow_Up />} />
        <Route path="/upload-resume" element={<Upload_Resume />} />
        <Route path="/resume-creator" element={<Resume_Creator />} />
      </Routes>
    </Router>
  );
}
export default App;
