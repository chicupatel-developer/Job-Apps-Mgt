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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalInfo());
    dispatch(getSkills());
  }, []);

  let techSkills =
    skills.length > 0 &&
    skills.map((item, i) => {
      return (
        <ul key={i} value={item}>
          <li style={{ marginTop: 20 }}>{item}</li>
        </ul>
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
                        {techSkills}
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
