import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router";

import Grid from "@material-ui/core/Grid";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
          <div className={classes.detailsDiv}>upload your resume here!!!</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Upload_Resume;
