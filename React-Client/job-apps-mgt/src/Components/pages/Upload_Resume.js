import React, { useState, useEffect } from "react";

import { useNavigate, useLocation } from "react-router";

import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography, Button, withStyles } from "@material-ui/core";
import CloudUpload from "@material-ui/icons/CloudUpload";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core";

import JobResumeService from "../../services/job.resume.service";
import { Backspace } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  detailsDiv: {
    backgroundColor: "lightblue",
    padding: "10px",
  },
  pageTitle: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    border: "2px solid blueviolet",
    borderRadius: "10px",
    backgroundColor: "lightseagreen",
    color: "black",
    fontSize: "x-large; ",
  },
  uploadSuccess: {
    color: "green",
  },
  uploadError: {
    color: "red",
  },
}));

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const Upload_Resume = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const { state } = useLocation();
  const {
    jobApplicationId,
    contactPersonName,
    contactEmail,
    companyName,
    phoneNumber,
    agencyName,
    webURL,
  } = state || {}; // Read values passed on state

  // file-upload
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log(
      "selected job-app,,,",
      jobApplicationId,
      contactPersonName,
      contactEmail,
      companyName,
      phoneNumber,
      agencyName,
      webURL
    );
    if (jobApplicationId === undefined) navigate("/follow-up");
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };
  const upload = () => {
    let currentFile = selectedFiles[0];

    setProgress(0);
    setCurrentFile(currentFile);

    JobResumeService.upload(currentFile, jobApplicationId, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        console.log(response);
        if (response.data.responseCode === 0) {
          // success
          setMessage(response.data.responseMessage);
          setIsError(false);
        } else if (response.data.responseCode === -1) {
          // fail
          setMessage(response.data.responseMessage);
          setIsError(true);
        }
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
        // 400
        if (error.response.status === 400) {
          console.log("400 !");
          if (error.response.data.responseCode === -1) {
            setMessage(error.response.data.responseMessage);
          } else {
            setMessage(error.response.data);
          }
        }
        // 500
        else {
          setMessage(error.response.data);
        }
      });

    setSelectedFiles(undefined);
  };

  const cancelUpload = () => {
    setTimeout(() => {
      navigate("/follow-up");
    }, 1000);
  };

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Resume-Upload</div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>

        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.detailsDiv}>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                  <div>
                    <h3>Job Application # {jobApplicationId}</h3>
                    <div>Contact Name : {contactPersonName}</div>
                    <div>Contact Email : {contactEmail}</div>
                    <div>Phone : {phoneNumber ? phoneNumber : "N/A"}</div>
                    <div>Company : {companyName ? companyName : "N/A"}</div>
                    <div>Agency : {agencyName ? agencyName : "N/A"}</div>
                    <div>URL : {webURL ? webURL : "N/A"}</div>
                  </div>
                </Grid>
              </Grid>
            </div>

            <p></p>
            <div className="mg20">
              {currentFile && (
                <Box className="mb25" display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <BorderLinearProgress
                      variant="determinate"
                      value={progress}
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${progress}%`}</Typography>
                  </Box>
                </Box>
              )}
              <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="btn-upload"
                  style={{ display: "none" }}
                  type="file"
                  onChange={selectFile}
                />
                <p></p>
                <Button
                  className="btn-choose"
                  variant="outlined"
                  component="span"
                >
                  Choose Files
                </Button>
              </label>
              <p></p>
              <div className="file-name">
                {selectedFiles && selectedFiles.length > 0
                  ? selectedFiles[0].name
                  : null}
              </div>
              <p></p>
              <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                disabled={!selectedFiles}
                onClick={upload}
              >
                <CloudUpload />
                &nbsp; Upload
              </Button>
              &nbsp;
              <Button
                className="btn-upload"
                variant="contained"
                component="span"
                onClick={cancelUpload}
              >
                <Backspace />
                &nbsp; Cancel
              </Button>
              <p></p>
              <Typography
                variant="subtitle2"
                className={
                  isError ? classes.uploadError : classes.uploadSuccess
                }
              >
                {message}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Upload_Resume;
