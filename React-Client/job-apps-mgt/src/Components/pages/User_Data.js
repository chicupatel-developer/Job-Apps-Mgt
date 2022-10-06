import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@material-ui/core/Grid";

import User_Resume_Create_Data from "../User_Components/User_Resume_Create_Data";
import User_Resume_Email_Data from "../User_Components/User_Resume_Email_Data";
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

const User_Data = (props) => {
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
          <div className={classes.pageTitle}>User-Data</div>
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
                <Tab label="Resume-Created" />
                <Tab label="Resume-Emailed" />
              </Tabs>
            </Box>
            <Box sx={{ padding: 2 }}>
              {tabIndex === 0 && (
                <Box>
                  <User_Resume_Create_Data />
                </Box>
              )}
              {tabIndex === 1 && (
                <Box>
                  <User_Resume_Email_Data />
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

export default User_Data;
