import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import { makeStyles } from "@material-ui/core";

import ResumeCreatorService from "../../services/resume.creator.service";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  pageHeader: {},
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

const User_Resume_Create_Data = () => {
  const classes = useStyles();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserResumeCreateData();
  }, []);

  const getUserResumeCreateData = () => {
    ResumeCreatorService.getUserResumeCreateData()
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      <div className={classes.pageHeader}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={3}>
            <div></div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.pageTitle}>Resume-Created-Downloaded</div>
            <p></p>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <div></div>
          </Grid>
        </Grid>
      </div>
      <p></p>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Created @</TableCell>
              <TableCell align="left">IP Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData &&
              userData.length > 0 &&
              userData.map((row) => (
                <TableRow key={row.userResumeCreateId}>
                  <TableCell align="left">{row.userResumeCreateId}</TableCell>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  <TableCell align="left">
                    <span>
                      {moment(row.resumeCreatedAt).format("MMM DD, YYYY")}
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <TextareaAutosize
                      value={row.userIPAddress}
                      style={{ width: 400, border: "none" }}
                    />
                    {/*}
                    <TextField
                      multiline
                      maxRows={3}
                      maxCols={10}
                      value={row.userIPAddress}
                    />
                    */}
                    {/*
                    <div style={{ overflowY: "scroll" }}>
                      {row.userIPAddress}
                    </div>
                    */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User_Resume_Create_Data;
