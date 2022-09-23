import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";

import { makeStyles } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

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
  detailsDiv: {
    backgroundColor: "white",
    padding: "10px",
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

// const Job_App_Status = ({ bgcolor, progress, height }) => {
const Job_App_Status = (props) => {
  const { bgcolor, progress, height } = props;

  const classes = useStyles();

  useEffect(() => {
    console.log("child component,,,tracking job-application,,,");

    setOpen(true);
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

  const Parentdiv = {
    height: height,
    width: "90%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 50,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

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
              <h2>[TRACKING] Job-Application # </h2>
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
              <Grid item xs={12} sm={12} md={12}>
                <div style={Parentdiv}>
                  <div style={Childdiv}>
                    <span style={progresstext}>{`${progress}%`}</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Job_App_Status;
