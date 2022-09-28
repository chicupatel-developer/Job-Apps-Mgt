import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
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
          <p></p>
          <div>
            <h3>Skills</h3>
            <div>{techSkills}</div>
          </div>
          <p></p>
          <div>
            <h3>Personal-Info</h3>
            <div>
              First Name : {personalInfo.firstName}
              <br />
              Last Name : {personalInfo.lastName}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Your_Resume;
