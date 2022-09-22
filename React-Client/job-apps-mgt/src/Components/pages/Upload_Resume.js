import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router";

import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Box,
  Typography,
  Button,
  ListItem,
  withStyles,
} from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core";

import JobResumeService from "../../services/job.resume.service";

const useStyles = makeStyles((theme) => ({
  detailsDiv: {
    backgroundColor: "lightblue",
    padding: "10px",
  },
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    textAlign: "left",
    // color: theme.palette.text.secondary,
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
        console.log(error.response.data);
        // 400
        if (error.response.status === 400) {
          console.log("400 !");
          setMessage("400 !");
          // setClassName("uploadError");
        }
        // 500
        else {
          setMessage(error.response.data.message);
          // setClassName("uploadError");
        }
      });

    setSelectedFiles(undefined);
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
                <Button
                  className="btn-choose"
                  variant="outlined"
                  component="span"
                >
                  Choose Files
                </Button>
              </label>
              <div className="file-name">
                {selectedFiles && selectedFiles.length > 0
                  ? selectedFiles[0].name
                  : null}
              </div>
              <Button
                className="btn-upload"
                color="primary"
                variant="contained"
                component="span"
                disabled={!selectedFiles}
                onClick={upload}
              >
                Upload
              </Button>

              <Typography
                variant="subtitle2"
                className={`upload-message ${isError ? "error" : ""}`}
              >
                Upload Response : {message}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Upload_Resume;
