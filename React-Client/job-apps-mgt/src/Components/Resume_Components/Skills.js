import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core";

import { getProvinces, getCities } from "../../services/local.service";

// redux
import { connect } from "react-redux";
import { getPersonalInfo } from "../../slices/myResume";

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

const Skills = (props) => {
  const classes = useStyles();

  // redux
  const { myResume } = props;

  useEffect(() => {
    props.getPersonalInfo();
  }, []);

  const saveSkills = (event) => {
    console.log(props.getPersonalInfo());
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

// export default Skills;
const mapStateToProps = (state) => {
  return {
    myResume: state.myResume,
  };
};

export default connect(mapStateToProps, {
  getPersonalInfo,
})(Skills);
