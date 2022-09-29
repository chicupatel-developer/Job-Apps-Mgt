import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@material-ui/core/Grid";

import Personal_Info from "../Resume_Components/Personal_Info";
import Skills from "../Resume_Components/Skills";
import Work_Experience_Create from "../Resume_Components/Work_Experience_Create";
import Your_Resume from "../Resume_Components/Your_Resume";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageHeader: {},
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

const Resume_Creator = (props) => {
  const classes = useStyles();

  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Resume-Creator</div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={1}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <Box>
            <Box>
              <Tabs value={tabIndex} onChange={handleTabChange}>
                <Tab label="Personal-Info" />
                <Tab label="Skills" />
                <Tab label="Work-Experience" />
                <Tab label="Resume" />
              </Tabs>
            </Box>
            <Box sx={{ padding: 2 }}>
              {tabIndex === 0 && (
                <Box>
                  <Personal_Info />
                </Box>
              )}
              {tabIndex === 1 && (
                <Box>
                  <Skills />
                </Box>
              )}
              {tabIndex === 2 && (
                <Box>
                  <Work_Experience_Create />
                </Box>
              )}
              {tabIndex === 3 && (
                <Box>
                  <Your_Resume />
                </Box>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={1}>
          <div></div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Resume_Creator;
