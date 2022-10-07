import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import { makeStyles } from "@material-ui/core";

import ResumeCreatorService from "../../services/resume.creator.service";

import moment from "moment";

const columns = [
  { id: "userResumeCreateId", label: "#", minWidth: 50 },
  { id: "firstName", label: "First Name", minWidth: 150 },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 150,
    align: "left",
    // format: (value) => value.toLocaleString(),
  },
  {
    id: "resumeCreatedAt",
    label: "Created @",
    minWidth: 150,
    align: "right",
    format: (value) => moment(value).format("MMM DD, YYYY"),
  },
  {
    id: "userIPAddress",
    label: "IP Address",
    // minWidth: 370,
    align: "left",
    format: (value) => (
      <TextareaAutosize
        placeholder="Empty"
        style={{ width: 370, border: "none" }}
        value={value}
      />
    ),
  },
];

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
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 540,
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="user-data-table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.userResumeCreateId}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default User_Resume_Create_Data;
