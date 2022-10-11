import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const columns = [
  { id: "userResumeEmailId", label: "#", minWidth: 50 },
  { id: "firstName", label: "First Name", minWidth: 150 },
  {
    id: "lastName",
    label: "Last Name",
    minWidth: 150,
    align: "left",
    // format: (value) => value.toLocaleString(),
  },
  {
    id: "resumeEmailedAt",
    label: "Emailed @",
    minWidth: 150,
    align: "right",
    format: (value) => moment(value).format("MMM DD, YYYY"),
  },
  {
    id: "userEmail",
    label: "User Email",
    minWidth: 300,
    align: "left",
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
  highlightBtn: {
    backgroundColor: "lightyellow",
    color: "red",
    fontSize: "large; ",
  },
}));

const User_Resume_Email_Data = () => {
  const classes = useStyles();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserResumeCreateData();
  }, []);

  const getUserResumeCreateData = () => {
    ResumeCreatorService.getUserResumeEmailData()
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

  const [highlight, setHighlight] = useState("firstName");
  const [orderBySetting, setOrderBySetting] = useState({
    colName: "firstName",
    dir: "asc",
  });
  const orderByProcess = (e, colId, dir) => {
    setHighlight(colId);

    var newOrderBySetting = {
      colName: colId,
      dir: dir,
    };
    setOrderBySetting(newOrderBySetting);

    var userData_ = userData.sort(compare);
    console.log(userData_);
    setUserData([...userData_]);

    if (dir === "asc") {
      setOrderBySetting({ ...orderBySetting, dir: "desc" });
    } else {
      setOrderBySetting({ ...orderBySetting, dir: "asc" });
    }
  };
  function compare(a, b) {
    if (orderBySetting.colName === "firstName") {
      if (orderBySetting.dir === "asc") {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      } else {
        if (a.firstName < b.firstName) {
          return 1;
        }
        if (a.firstName > b.firstName) {
          return -1;
        }
        return 0;
      }
    } else if (orderBySetting.colName === "lastName") {
      if (orderBySetting.dir === "asc") {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
        return 0;
      } else {
        if (a.lastName < b.lastName) {
          return 1;
        }
        if (a.lastName > b.lastName) {
          return -1;
        }
        return 0;
      }
    }
  }
  return (
    <div>
      <div className={classes.pageHeader}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={3}>
            <div></div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={classes.pageTitle}>Resume-Emailed</div>
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
                    {column.id === "firstName" && (
                      <span>
                        {highlight === "firstName" ? (
                          <span>
                            {orderBySetting.dir === "desc" ? (
                              <span>
                                {/*
                                hightlight (desc) 
                                */}
                                <Button
                                  className={classes.highlightBtn}
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    orderByProcess(e, column.id, "desc");
                                  }}
                                >
                                  {" "}
                                  <ArrowDownwardIcon />
                                  &nbsp;{column.label}
                                </Button>
                              </span>
                            ) : (
                              <span>
                                {/*
                                hightlight (asc) 
                                */}
                                <Button
                                  className={classes.highlightBtn}
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    orderByProcess(e, column.id, "asc");
                                  }}
                                >
                                  <ArrowUpwardIcon />
                                  &nbsp;{column.label}
                                </Button>
                              </span>
                            )}
                          </span>
                        ) : (
                          <span>
                            {orderBySetting.dir === "desc" ? (
                              <span>
                                {/*
                                not hightlight (desc) 
                                */}
                                <Button
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    orderByProcess(e, column.id, "desc");
                                  }}
                                >
                                  &nbsp;{column.label}
                                </Button>
                              </span>
                            ) : (
                              <span>
                                {/*
                                not hightlight (asc) 
                                */}
                                <Button
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    orderByProcess(e, column.id, "asc");
                                  }}
                                >
                                  &nbsp;{column.label}
                                </Button>
                              </span>
                            )}
                          </span>
                        )}
                      </span>
                    )}

                    {column.id === "lastName" && (
                      <span>
                        {highlight === "lastName" ? (
                          <span>
                            {orderBySetting.dir === "desc" ? (
                              <span>
                                <Button
                                  className={classes.highlightBtn}
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    orderByProcess(e, column.id, "desc");
                                  }}
                                >
                                  {" "}
                                  <ArrowDownwardIcon />
                                  &nbsp;{column.label}
                                </Button>
                              </span>
                            ) : (
                              <span>
                                <Button
                                  className={classes.highlightBtn}
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    orderByProcess(e, column.id, "asc");
                                  }}
                                >
                                  <ArrowUpwardIcon />
                                  &nbsp;{column.label}
                                </Button>
                              </span>
                            )}
                          </span>
                        ) : (
                          <span>
                            {orderBySetting.dir === "desc" ? (
                              <span>
                                <Button
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    orderByProcess(e, column.id, "desc");
                                  }}
                                >
                                  &nbsp;{column.label}
                                </Button>
                              </span>
                            ) : (
                              <span>
                                <Button
                                  variant="contained"
                                  type="button"
                                  onClick={(e) => {
                                    orderByProcess(e, column.id, "asc");
                                  }}
                                >
                                  &nbsp;{column.label}
                                </Button>
                              </span>
                            )}
                          </span>
                        )}
                      </span>
                    )}

                    {column.id !== "firstName" && column.id !== "lastName" && (
                      <span>{column.label}</span>
                    )}
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
                      key={row.userResumeEmailId}
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

export default User_Resume_Email_Data;
