import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getPersonalInfo } from "../../slices/personalInfo";

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

const Skills = () => {
  const classes = useStyles();

  // redux
  const personalInfo = useSelector((state) => state.personalInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonalInfo());
    console.log("getting personal-info from skills,,,", personalInfo);
  }, []);

  const saveSkills = (event) => {};

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Skills</div>
          <p></p>
          First Name : {personalInfo.firstName}
          <p></p>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>

      <p></p>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.buttonPaper}>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              type="button"
              onClick={(e) => {
                saveSkills(e);
              }}
            >
              Save!
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Skills;
