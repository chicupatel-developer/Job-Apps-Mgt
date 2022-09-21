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

// child-component
import Filter_Job_Apps from "../Child_Components/Filter_Job_Apps";

// child-component
// modal
import View_JobApp from "../Child_Components/View_JobApp";
import Edit_JobApp from "../Child_Components/Edit_JobApp";
import Delete_JobApp from "../Child_Components/Delete_JobApp";

// redux
import { connect } from "react-redux";
import {
  retrieveJobApps,
  editJobApp,
  deleteJobApp,
} from "../../slices/jobApps";
import {
  retrieveAppStatusTypes,
  setAppStatusTypes,
} from "../../slices/appStatusTypes";

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
}));

const defaultValues = {
  contactPersonName: "",
  province: "",
  city: "",
  appliedOn: null,
};

const Follow_Up = (props) => {
  const classes = useStyles();

  // modal
  // view
  const [open, setOpen] = useState(false);
  // edit
  const [openEdit, setOpenEdit] = useState(false);
  // delete
  const [openDelete, setOpenDelete] = useState(false);
  const [jobApp, setJobApp] = useState({});

  // redux
  const { jobApps, appStatusTypes } = props;

  const pull_data = (data) => {
    console.log(data); // LOGS DATA FROM CHILD
  };

  // this will get notified when child-modal is closed
  // callback as props
  // callback-view
  const viewJobAppIsClosed = (data) => {
    console.log("received at parent,,,", data); // LOGS DATA FROM CHILD
    setOpen(false);
  };
  // callback-edit
  const editJobAppIsClosed = (data) => {
    console.log("received at parent,,,edited new jobApp,,,", data); // LOGS DATA FROM CHILD
    setOpenEdit(false);

    // no need for reloading jobApps[] from api via redux-store
    // reload jobApps[] from redux-store
    // props.retrieveJobApps();

    // here data === just edited jobApp{} comping from child-modal
    // so no need for reloading jobApps[] from api via redux-store
    props.editJobApp(data);
  };
  // callback-edit
  const deleteJobAppIsClosed = (data) => {
    console.log("received at parent,,,deleted jobApp,,,", data); // LOGS DATA FROM CHILD
    setOpenDelete(false);

    props.deleteJobApp(data);
  };

  useEffect(() => {
    // retrieve values from redux-store
    props.retrieveJobApps();
    props.retrieveAppStatusTypes();
  }, []);

  const downloadResume = (e, jobApplicationId) => {
    console.log("download resume,,,", jobApplicationId);
  };
  const viewJobApp = (e, jobApplicationId) => {
    console.log("view job app,,,", jobApplicationId);

    // this will set value @ redux-store for appStatusTypes[]
    props.setAppStatusTypes(appStatusTypes);

    JobApplicationService.viewJobApp(jobApplicationId)
      .then((response) => {
        console.log(response.data);
        setJobApp(response.data);

        // this will open child-component,,, that contains modal content
        setOpen(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const editJobApp = (e, jobApplicationId) => {
    console.log("edit job app,,,", jobApplicationId);

    // this will set value @ redux-store for appStatusTypes[]
    props.setAppStatusTypes(appStatusTypes);

    JobApplicationService.viewJobApp(jobApplicationId)
      .then((response) => {
        console.log(response.data);
        setJobApp(response.data);

        // this will open child-component,,, that contains modal content
        setOpenEdit(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteJobApp = (e, jobApplicationId) => {
    console.log("delete job app,,,", jobApplicationId);

    // this will set value @ redux-store for appStatusTypes[]
    props.setAppStatusTypes(appStatusTypes);

    JobApplicationService.viewJobApp(jobApplicationId)
      .then((response) => {
        console.log(response.data);
        setJobApp(response.data);

        // this will open child-component,,, that contains modal content
        setOpenDelete(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const uploadResume = (e, jobApplicationId) => {
    console.log("upload resume,,,", jobApplicationId);
  };
  const viewJobAppStatus = (e, jobApplicationId) => {
    console.log("view job app status,,,", jobApplicationId);
  };
  let jobAppsList =
    jobApps.length > 0 &&
    jobApps.map((item, i) => {
      return (
        <div key={i}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={1}></Grid>
            <Grid item xs={12} sm={12} md={10}>
              <div className={classes.jobAppContainer}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button
                      className={classes.btnView}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        viewJobApp(e, item.jobApplicationId);
                      }}
                    >
                      <ViewModuleIcon />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnEdit}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        editJobApp(e, item.jobApplicationId);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnDelete}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        deleteJobApp(e, item.jobApplicationId);
                      }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnUpload}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        uploadResume(e, item.jobApplicationId);
                      }}
                    >
                      <CloudUpload /> Resume
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnAppStatus}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        viewJobAppStatus(e, item.jobApplicationId);
                      }}
                    >
                      <Autorenew /> App Status
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.appStatus}>
                      <span
                        style={{
                          color: getAppStatusTypeColor(item.appStatus),
                          fontWeight: "bold",
                        }}
                      >
                        [{getAppStatus(appStatusTypes, item.appStatus)}] &nbsp;{" "}
                        {Moment(item.appliedOn).format("MMMM DD, YYYY")}
                        <span>
                          &nbsp;&nbsp;@ {item.city}, {item.province}
                        </span>
                      </span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.jobAppDetails}>
                      Contact Name : {item.contactPersonName}
                    </div>
                    <div className={classes.jobAppDetails}>
                      Contact Email : {item.contactEmail}
                    </div>
                    <div className={classes.jobAppDetails}>
                      Phone : {item.phoneNumber ? item.phoneNumber : "N/A"}
                    </div>
                    <div className={classes.jobAppDetails}>
                      <Button
                        className={classes.btnDownload}
                        variant="contained"
                        type="button"
                        onClick={(e) => {
                          downloadResume(e, item.jobApplicationId);
                        }}
                      >
                        <CloudDownload /> Resume
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <div className={classes.jobAppDetails}>
                      Company : {item.companyName ? item.companyName : "N/A"}
                    </div>
                    <div className={classes.jobAppDetails}>
                      Agency : {item.agencyName ? item.agencyName : "N/A"}
                    </div>
                    <div className={classes.jobAppDetails}>
                      URL : {item.webURL ? item.webURL : "N/A"}
                    </div>
                    <div className={classes.followUpNotes}>
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          Follow-Up-Notes!
                        </AccordionSummary>

                        <AccordionDetails>
                          {item.followUpNotes ? item.followUpNotes : "N/A"}
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={1}></Grid>
          </Grid>
        </div>
      );
    }, this);

  return (
    <div className={classes.pageHeader}>
      {open && <View_JobApp jobApp={jobApp} func={viewJobAppIsClosed} />}

      {openEdit && <Edit_JobApp jobApp={jobApp} func={editJobAppIsClosed} />}

      {openDelete && (
        <Delete_JobApp jobApp={jobApp} func={deleteJobAppIsClosed} />
      )}

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Follow-Up</div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div className={classes.searchDiv}>
            <Filter_Job_Apps func={pull_data} />
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <div>{jobAppsList}</div>
        </Grid>
      </Grid>
    </div>
  );
};

// export default Follow_Up;

const mapStateToProps = (state) => {
  return {
    jobApps: state.jobApps,
    appStatusTypes: state.appStatusTypes,
  };
};

export default connect(mapStateToProps, {
  retrieveJobApps,
  editJobApp,
  deleteJobApp,
  retrieveAppStatusTypes,
  setAppStatusTypes,
})(Follow_Up);
