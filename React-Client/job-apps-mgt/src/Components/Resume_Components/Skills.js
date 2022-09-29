import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import SaveIcon from "@material-ui/icons/Save";

import { makeStyles } from "@material-ui/core";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setSkills, getSkills } from "../../slices/skills";

// chip
import ChipInput from "material-ui-chip-input";

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
  const skills = useSelector((state) => state.skills);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSkills());
  }, []);

  const saveSkills = (event) => {
    dispatch(setSkills(skills));
  };

  const handleChange = (chips) => {
    console.log(chips);
    dispatch(setSkills(chips));
  };

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Skills</div>
          <p></p>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>

      <p></p>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={2}></Grid>
        <Grid item xs={12} sm={12} md={8}>
          <div>
            <ChipInput
              label={"Enter Your Core Skills"}
              defaultValue={
                skills && skills.length > 0
                  ? skills
                  : ["C#", "MVC", "Web API", "EF"]
              }
              onChange={(chips) => handleChange(chips)}
              InputProps={{}}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={2}></Grid>
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
              <SaveIcon />
              &nbsp;Save!
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Skills;
