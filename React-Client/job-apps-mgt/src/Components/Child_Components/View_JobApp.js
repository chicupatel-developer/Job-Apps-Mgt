import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core";

import JobApplicationService from "../../services/job.application.service";
import {
  getProvinces,
  getCities,
  getAppStatus,
  getAppStatusTypeColor,
} from "../../services/local.service";

import moment from "moment";

import CloseIcon from "@material-ui/icons/Close";

import Moment from "moment";

import Modal from "@material-ui/core/Modal";

// redux
import { connect } from "react-redux";
import { getAppStatusTypes } from "../../slices/appStatusTypes";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    position: "absolute",
    width: 550,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  btnDelete: {
    color: "black",
    backgroundColor: "orange",
  },
  detailsDiv: {
    backgroundColor: "lightpink",
    padding: "10px",
  },
}));

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};
const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const View_JobApp = (props) => {
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

    // callback as props
    props.func("view job-app is closed");
  };

  useEffect(() => {
    console.log("child component,,," + jobApp.jobApplicationId);

    // retrieve values from redux-store
    // this will popup appStatusTypes from redux-store
    props.getAppStatusTypes();

    setOpen(true);
  }, []);

  return (
    <div>
      <Modal
        style={{ alignItems: "center", justifyContent: "center" }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.modalPaper}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={10}>
              <h2>[VIEW] Apply Job Details For # {jobApp.jobApplicationId}</h2>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <Button
                className={classes.btnDelete}
                variant="contained"
                type="button"
                onClick={handleClose}
              >
                <CloseIcon />
              </Button>
            </Grid>
          </Grid>

          <div className={classes.detailsDiv}>
            <Grid container spacing={1}>
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
                {jobApp.contactPersonName ? jobApp.contactPersonName : "N/A"}
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
        </div>
      </Modal>
    </div>
  );
};

// export default View_JobApp;

const mapStateToProps = (state) => {
  return {
    appStatusTypes: state.appStatusTypes,
  };
};

export default connect(mapStateToProps, {
  getAppStatusTypes,
})(View_JobApp);
