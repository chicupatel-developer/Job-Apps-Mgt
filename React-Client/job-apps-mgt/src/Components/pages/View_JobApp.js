import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Autorenew, CloudDownload, ExpandMore } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core";

import JobApplicationService from "../../services/job.application.service";
import {
  getProvinces,
  getCities,
  getAppStatus,
  getAppStatusTypeColor,
} from "../../services/local.service";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";

import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloudUpload from "@material-ui/icons/CloudUpload";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CloseIcon from "@material-ui/icons/Close";

import Moment from "moment";

import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  pageHeader: {},
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    textAlign: "left",
    // color: theme.palette.text.secondary,
  },
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
  followUpNotes: {
    textAlign: "left",
    verticalAlign: "middle",
    border: "4px solid purple",
    borderRadius: "10px",
  },
  jobAppContainer: {
    fontSize: "medium",
    textAlign: "left",
    verticalAlign: "middle",
    border: "2px solid blue",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  jobAppDetails: {
    padding: "5px",
  },
  btnDownload: {
    color: "black",
    backgroundColor: "lightgreen",
  },
  btnView: {
    color: "black",
    backgroundColor: "lightpink",
  },
  btnEdit: {
    color: "black",
    backgroundColor: "lightskyblue",
  },
  btnDelete: {
    color: "black",
    backgroundColor: "orange",
  },
  btnUpload: {
    color: "black",
    backgroundColor: "lightseagreen",
  },
  btnAppStatus: {
    color: "black",
    backgroundColor: "white",
  },
  appStatus: {
    padding: "5px",
  },
  searchDiv: {
    textAlign: "center",
    verticalAlign: "middle",
  },

  // modal
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
    console.log("child component,,," + props.jobApp.jobApplicationId);
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
              <h2>[VIEW] Job-Application # {props.jobApp.jobApplicationId}</h2>
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

          <div>Job Application Data</div>
        </div>
      </Modal>
    </div>
  );
};

export default View_JobApp;
