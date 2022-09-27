import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

import JobApplicationService from "../../services/job.application.service";
import {
  getAppStatus,
  getAppStatusTypeColor,
} from "../../services/local.service";

import BackspaceIcon from "@material-ui/icons/Backspace";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import Moment from "moment";

import Modal from "@material-ui/core/Modal";

// redux
import { connect } from "react-redux";
import { getAppStatusTypes } from "../../slices/appStatusTypes";
import { deleteJobApp } from "../../slices/jobApps";

const useStyles = makeStyles((theme) => ({
  modalClass: {
    position: "absolute",
    overflow: "scroll", // adding scroll bar
    height: "75%",
    width: "60%",
    display: "block",
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnDelete: {
    color: "black",
    backgroundColor: "red",
  },
  btnCancel: {
    color: "black",
    backgroundColor: "white",
  },
  detailsDiv: {
    backgroundColor: "orange",
    padding: "30px",
    fontSize: "medium",
  },
  headerDiv: {
    fontSize: "large",
    fontWeight: "bold",
    paddingBottom: "10px",
    paddingTop: "10px",
    textAlign: "center",
    verticalAlign: "middle",
  },
  headerBtns: {
    fontWeight: "bold",
    paddingBottom: "10px",
    paddingTop: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    marginBottom: "30px",
  },
  jobAppDeleteError: {
    color: "red",
    fontSize: "medium",
    fontWeight: "bold",
    paddingBottom: "10px",
    paddingTop: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid red",
    borderRadius: "10px",
  },
  jobAppDeleteSuccess: {
    color: "green",
    fontSize: "medium",
    fontWeight: "bold",
    paddingBottom: "10px",
    paddingTop: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
  },
}));

const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const Delete_JobApp = (props) => {
  const [jobAppDeleteResponse, setJobAppDeleteResponse] = useState({});

  const [deleted, setDeleted] = React.useState(false);

  let navigate = useNavigate();

  // redux
  const { jobApp, appStatusTypes } = props;
  // jobApp is coming from parent
  // appStatusTypes is coming from redux-store

  const classes = useStyles();

  // modal
  const [modalStyle] = useState(getModalStyle());
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log("model is closing,,,");

    setOpen(false);
    props.func(jobApp);
  };

  useEffect(() => {
    console.log("child component,,," + jobApp.jobApplicationId);

    // retrieve values from redux-store
    // this will popup appStatusTypes from redux-store
    props.getAppStatusTypes();

    setOpen(true);
  }, []);

  const handleDelete = (e, jobApp) => {
    // api call
    JobApplicationService.deleteJobApplication(jobApp)
      .then((response) => {
        console.log(response.data);
        setJobAppDeleteResponse({});

        var jobAppDeleteResponse = {
          responseCode: response.data.responseCode,
          responseMessage: response.data.responseMessage,
        };
        if (response.data.responseCode === 0) {
          setJobAppDeleteResponse(jobAppDeleteResponse);

          // delete from jobApps[] redux-store
          props.deleteJobApp(jobApp);
          
          setTimeout(() => {
            handleClose();
            navigate("/follow-up");
          }, 3000);
        } else if (response.data.responseCode === -1) {
          setJobAppDeleteResponse(jobAppDeleteResponse);
        }
      })
      .catch((error) => {
        console.log(error);
        setJobAppDeleteResponse({});
        // 400
        if (error.response.status === 400) {
          console.log("400 !");
          setJobAppDeleteResponse({
            responseCode: -1,
            responseMessage: error.response.data,
          });
        }
        // 500
        if (error.response.status === 500) {
          console.log("500 !");
          setJobAppDeleteResponse({
            responseCode: -1,
            responseMessage: error.response.data,
          });
        }
      });
  };

  return (
    <div>
      <Modal
        className={classes.modalClass}
        style={modalStyle}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div>
          <Box className={classes.root}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <h2>
                      [DELETE] Apply Job Details For # {jobApp.jobApplicationId}
                    </h2>
                  </Grid>
                  <p></p>
                  <Grid item xs={12} sm={12} md={12}>
                    {jobAppDeleteResponse &&
                    jobAppDeleteResponse.responseCode === -1 ? (
                      <div className={classes.jobAppDeleteError}>
                        {jobAppDeleteResponse.responseMessage}
                      </div>
                    ) : (
                      <span>
                        {jobAppDeleteResponse.responseCode === 0 ? (
                          <div className={classes.jobAppDeleteSuccess}>
                            {jobAppDeleteResponse.responseMessage}
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </span>
                    )}
                  </Grid>

                  <div className={classes.detailsDiv}>
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.headerDiv}
                      >
                        <h2>
                          Are you sure wants to delete this Job-Application?
                        </h2>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.headerBtns}
                      >
                        <Button
                          onClick={(e) => {
                            handleDelete(e, jobApp);
                          }}
                          variant="contained"
                          type="button"
                          className={classes.btnDelete}
                        >
                          <DeleteForeverIcon style={{ fontSize: 50 }} />
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          className={classes.btnCancel}
                          variant="contained"
                          type="button"
                          onClick={handleClose}
                        >
                          <BackspaceIcon style={{ fontSize: 50 }} />
                        </Button>
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: "large",
                          }}
                        >
                          App-Status :
                        </span>
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        <span
                          style={{
                            color: getAppStatusTypeColor(jobApp.appStatus),
                            fontWeight: "bold",
                            fontSize: "large",
                          }}
                        >
                          {getAppStatus(appStatusTypes, jobApp.appStatus)}
                        </span>
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Notes :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.followUpNotes ? jobApp.followUpNotes : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Company Name :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.companyName ? jobApp.companyName : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Agency Name :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.agencyName ? jobApp.agencyName : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Web URL :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.webURL ? jobApp.webURL : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Contact Person :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.contactPersonName
                          ? jobApp.contactPersonName
                          : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Contact Email :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.contactEmail ? jobApp.contactEmail : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Phone Number :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.phoneNumber ? jobApp.phoneNumber : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Province :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.province ? jobApp.province : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        City :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.city ? jobApp.city : "N/A"}
                      </Grid>

                      <Grid item xs={12} sm={12} md={4}>
                        Applied On :
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        {jobApp.appliedOn
                          ? Moment(jobApp.appliedOn).format("DD-MMM-YYYY")
                          : "N/A"}
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

// export default View_JobApp;

const mapStateToProps = (state) => {
  return {
    appStatusTypes: state.appStatusTypes,
    jobApps: state.jobApps,
  };
};

export default connect(mapStateToProps, {
  getAppStatusTypes,
  deleteJobApp,
})(Delete_JobApp);
