import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getPersonalInfo } from "../../slices/personalInfo";
import { getSkills } from "../../slices/skills";
import { setWorkExperience } from "../../slices/workExperience";

import moment from "moment";

import { displayJobDetails, getJobDetails } from "../../services/local.service";

const useStyles = makeStyles((theme) => ({
  pageHeader: {},

  btn: {
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "lightskyblue",
    width: "200px",
    color: "black",
    fontSize: "x-large",
  },
  buttonPaper: {
    textAlign: "center",
  },
  pageTitle: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    border: "2px solid blue",
    borderRadius: "2px",
    backgroundColor: "lightyellow",
    color: "black",
    fontSize: "x-large; ",
  },
  detailsDiv: {
    backgroundColor: "white",
    padding: "10px",
    textAlign: "left",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
  },
}));

const Your_Resume = () => {
  const classes = useStyles();

  // redux
  const personalInfo = useSelector((state) => state.personalInfo);
  const skills = useSelector((state) => state.skills);
  const wos = useSelector((state) => state.workExperience);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalInfo());
    dispatch(getSkills());
  }, []);

  let techSkills =
    skills.length > 0 &&
    skills.map((item, i) => {
      return (
        <div key={i} value={item}>
          <span style={{ marginTop: 20 }}>
            {i + 1}) {item}
          </span>
        </div>
      );
    }, this);

  let displayWos =
    wos.length > 0 &&
    wos.map((wo, i) => {
      return (
        <div key={i} value={wo}>
          <div style={{ marginTop: 20 }}>
            {i + 1}) {wo.employerName}
            <div>
              <span>
                Start-Date #{" "}
                {wo.startDate
                  ? moment(wo.startDate).format("DD/MM/YYYY")
                  : "N/A"}
              </span>
              <br />
              <span>
                End-Date #{" "}
                {wo.endDate ? moment(wo.endDate).format("DD/MM/YYYY") : "N/A"}
              </span>
              <br />
              <div>Job Details # {getJobDetails(wo.jobDetails, true)}</div>
              <span>City # {wo.city ? wo.city : "N/A"}</span>
              <br />
              <span>Province # {wo.province ? wo.province : "N/A"}</span>
            </div>
          </div>
        </div>
      );
    }, this);

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Your-Resume</div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6}>
          <div>
            <Box className={classes.root}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                      <h3>Personal-Info</h3>
                    </Grid>
                  </Grid>
                  {personalInfo && personalInfo.firstName ? (
                    <div className={classes.detailsDiv}>
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12}>
                          <div>
                            First Name : {personalInfo.firstName}
                            <br />
                            Last Name : {personalInfo.lastName}
                            <br />
                            Email : {personalInfo.email}
                            <br />
                            Phone :{" "}
                            {personalInfo.phoneNumber
                              ? personalInfo.phoneNumber
                              : "N/A"}
                            <br />
                            Province : {personalInfo.province}
                            <br />
                            City : {personalInfo.city}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  ) : (
                    <div>N/A</div>
                  )}
                </CardContent>
              </Card>
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div>
            <Box className={classes.root}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                      <h3>Skills</h3>
                    </Grid>
                  </Grid>
                  <div className={classes.detailsDiv}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={12}>
                        {techSkills && techSkills.length > 0 ? (
                          <div>{techSkills}</div>
                        ) : (
                          <div>N/A</div>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Box>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div>
            <Box className={classes.root}>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                      <h3>Work-Experience</h3>
                    </Grid>
                  </Grid>
                  <div className={classes.detailsDiv}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={12}>
                        {wos && wos.length > 0 ? (
                          <div>{displayWos}</div>
                        ) : (
                          <div>N/A</div>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Your_Resume;
