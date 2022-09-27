import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

import { makeStyles } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

// sub-child component,,, which is part of this child-modal
import Tracking_Data from "./Tracking_Data";

const useStyles = makeStyles((theme) => ({
  modalClass: {
    position: "absolute",
    overflow: "scroll", // adding scroll bar
    height: "70%",
    width: "60%",
    display: "block",
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  detailsDiv: {
    backgroundColor: "white",
    padding: "10px",
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
  },
  btnClose: {
    color: "black",
    backgroundColor: "orange",
  },
  companyNameSpan: {
    fontSize: "medium",
  },
}));

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};
const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

// const Job_App_Tracking = ({ trackingData }) => {
const Job_App_Tracking = (props) => {
  const { trackingData, trackingJobApp } = props;

  const classes = useStyles();

  useEffect(() => {
    console.log("child component,,,tracking job-application,,,");

    setOpen(true);

    console.log(trackingData);
  }, []);

  // modal
  const [modalStyle] = useState(getModalStyle());
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log("model is closing,,,");
    setOpen(false);

    // callback as props
    props.func("tracking job-app is closed");
  };

  let displayTrackingData =
    trackingData.length > 0 &&
    trackingData.map((item, i) => {
      return (
        <div key={i}>
          <Tracking_Data
            bgcolor="skyblue"
            height={30}
            appCompleted={item.appCompleted}
            appStatusDisplay={item.appStatusDisplay}
            appStatusChangedOn={item.appStatusChangedOn}
          />
        </div>
      );
    }, this);

  return (
    <div>
      <Modal
        aria-labelledby="Job-App Tracking"
        aria-describedby="Job-App Tracking"
        open={open}
        onClose={handleClose}
        className={classes.modalClass}
        style={modalStyle}
      >
        <div>
          <Box className={classes.root}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={10}>
                    <h2>
                      [TRACKING] Job-Application #{" "}
                      {trackingJobApp.jobApplicationId}
                      <br />
                      {trackingJobApp.companyName ? (
                        <span className={classes.companyNameSpan}>
                          Company : {trackingJobApp.companyName}
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </h2>
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <Button
                      className={classes.btnClose}
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
                    <Grid item xs={12} sm={12} md={12}>
                      {/*
                      <div style={Parentdiv}>
                        <div style={Childdiv}>
                          <span style={progresstext}>{`${progress}%`}</span>
                        </div>
                      </div>
                      */}
                      {displayTrackingData}
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
            </Card>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default Job_App_Tracking;
