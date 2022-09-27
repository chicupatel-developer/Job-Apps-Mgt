import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router";

import Grid from "@material-ui/core/Grid";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import TextArea from "@material-ui/core/TextareaAutosize";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core";

import JobApplicationService from "../../services/job.application.service";
import {
  getProvinces,
  getCities,
} from "../../services/local.service";

import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import Modal from "@material-ui/core/Modal";

// redux
import { connect } from "react-redux";
import { getAppStatusTypes } from "../../slices/appStatusTypes";

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
  appStatusGrp: {
    backgroundColor: "lightgreen",
  },
  btnClose: {
    color: "black",
    backgroundColor: "orange",
  },
  detailsDiv: {
    backgroundColor: "lightblue",
    padding: "10px",
  },
  modelError: {
    color: "red",
    fontSize: "medium",
    textAlign: "left",
    verticalAlign: "middle",
    border: "2px solid red",
    borderRadius: "10px",
    paddingTop: "10px",
  },
  jobAppEditError: {
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
  jobAppEditSuccess: {
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
  btn: {
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "lightskyblue",
    width: "400px",
    color: "black",
    fontSize: "x-large",
  },
  controlError: {
    color: "red",
    fontSize: "medium; ",
  },
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    textAlign: "left",
    // color: theme.palette.text.secondary,
  },
  buttonPaper: {
    textAlign: "center",
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
}));

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};
const getModalStyle = () => {
  // const top = 50 + rand();
  const top = 50;
  // const left = 50 + rand();
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const Edit_JobApp = (props) => {
  let navigate = useNavigate();

  // redux
  const { jobApp, appStatusTypes } = props;
  // jobApp is coming from parent
  // appStatusTypes is coming from redux-store

  const [jobApp_, setJobApp_] = useState({});

  const classes = useStyles();

  // modal
  const [modalStyle] = useState(getModalStyle());
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log("model is closing,,,");
    setOpen(false);

    // callback as props
    // props.func("edit job-app is closed");
    props.func(jobApp_);
  };

  const [showAppStatusChangedOn, setShowAppStatusChangedOn] = useState(false);
  const [prevAppStatus, setPrevAppStatus] = useState("");

  useEffect(() => {
    console.log("child component,,," + jobApp.jobApplicationId);

    setProvinces(getProvinces());

    // retrieve values from redux-store
    // this will popup appStatusTypes from redux-store
    props.getAppStatusTypes();

    // setJobApp_(jobApp);
    setPrevAppStatus(jobApp.appStatus);

    setJobApp_({
      ...jobApp,
      ["appStatusChangedOn"]: new Date(),
    });

    setOpen(true);
  }, []);

  // form
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [modelErrors, setModelErrors] = useState([]);
  const [jobAppEditResponse, setJobAppEditResponse] = useState({});
  // const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  // reset form
  // form reference
  const formRef = useRef(null);
  const checkForPhoneNumber = (newVal) => {
    console.log(newVal);
    // const re = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    const re = /^(()?\d{3}())?(-|\s)?\d{3}(-|\s)?\d{4}$/;
    if (re.test(newVal)) return true;
    else return false;
  };
  const checkForEmail = (newVal) => {
    const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (re.test(newVal)) return true;
    else return false;
  };
  const setField = (field, value) => {
    console.log(field, value);

    if (field === "province" && value === "") {
      setCities([]);
    } else if (field === "province" && value !== "") {
      setCities(getCities(value));
      jobApp_.city = "";
    }

    if (field === "appStatus" && value !== "" && value !== prevAppStatus) {
      setShowAppStatusChangedOn(true);
    } else {
      setShowAppStatusChangedOn(false);
    }

    setJobApp_({
      ...jobApp_,
      [field]: value,
    });

    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const findFormErrors = () => {
    const {
      companyName,
      agencyName,
      webURL,
      contactPersonName,
      contactEmail,
      phoneNumber,
      province,
      city,
      appliedOn,
      appStatus,
      appStatusChangedOn,
    } = jobApp_;
    const newErrors = {};

    if (!contactPersonName || contactPersonName === "")
      newErrors.contactPersonName = "Contact-Person-Name is Required!";

    if (!contactEmail || contactEmail === "")
      newErrors.contactEmail = "Contact-Email is Required!";
    if (!(!contactEmail || contactEmail === "")) {
      if (!checkForEmail(contactEmail)) {
        newErrors.contactEmail = "Invalid Email!";
      } else {
        var key = "contactEmail";
        delete newErrors[key];
      }
    }

    if (!province || province === "")
      newErrors.province = "Province is Required!";
    if (!city || city === "") newErrors.city = "City is Required!";
    if (!appliedOn || appliedOn === "")
      newErrors.appliedOn = "Applied On is Required!";

    if (!(!phoneNumber || phoneNumber === "")) {
      if (!checkForPhoneNumber(phoneNumber))
        newErrors.phoneNumber = "Invalid Phone Number!";
    }

    if (!String(appStatus) || String(appStatus) === "")
      newErrors.appStatus = "App-Status is Required!";
    if (!appStatusChangedOn || appStatusChangedOn === "")
      newErrors.appStatusChangedOn = "App-Status Changed-On is Required!";

    return newErrors;
  };
  const handleModelState = (error) => {
    var errors = [];
    if (error.response.status === 400) {
      if (error.response.data.errors === undefined) {
        console.log("Bad Request!!!");
        errors.push(error.response.data.title);
      } else {
        for (let prop in error.response.data.errors) {
          if (error.response.data.errors[prop].length > 1) {
            for (let error_ in error.response.data.errors[prop]) {
              errors.push(error.response.data.errors[prop][error_]);
            }
          } else {
            errors.push(error.response.data.errors[prop]);
          }
        }
      }
    } else {
      console.log(error);
    }
    return errors;
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log(jobApp_);

      // modelstate check @ api
      // jobApp_.contactPersonName = null;
      // jobApp_.contactEmail = null;

      var jobApplicationEditVM = {};

      if (Number(jobApp_.appStatus) !== Number(prevAppStatus)) {
        jobApplicationEditVM = {
          jobApplication: jobApp_,
          appStatusChanged: true,
          appStatusChangedOn: jobApp_.appStatusChangedOn,
        };
      } else {
        jobApplicationEditVM = {
          jobApplication: jobApp_,
          appStatusChanged: false,
          appStatusChangedOn: new Date(),
        };
      }

      console.log(jobApplicationEditVM);

      // api call
      JobApplicationService.editJobApplication(jobApplicationEditVM)
        .then((response) => {
          console.log(response.data);

          setModelErrors([]);
          setJobAppEditResponse({});

          var jobAppEditResponse = {
            responseCode: response.data.responseCode,
            responseMessage: response.data.responseMessage,
          };
          if (response.data.responseCode === 0) {
            setJobAppEditResponse(jobAppEditResponse);

            setTimeout(() => {
              handleClose();
              navigate("/follow-up");
            }, 3000);
          } else if (response.data.responseCode === -1) {
            setJobAppEditResponse(jobAppEditResponse);
          }
        })
        .catch((error) => {
          console.log(error);
          setModelErrors([]);
          setJobAppEditResponse({});
          // 400
          // ModelState
          if (error.response.status === 400) {
            console.log("400 !");
            var modelErrors = handleModelState(error);
            setModelErrors(modelErrors);
          }
        });
    }
  };
  let modelErrorList =
    modelErrors.length > 0 &&
    modelErrors.map((item, i) => {
      return (
        <ul key={i} value={item}>
          <li style={{ marginTop: -20 }}>{item}</li>
        </ul>
      );
    }, this);
  const renderOptionsForAppStatusTypes = () => {
    return appStatusTypes.map((dt, i) => {
      return (
        <MenuItem value={i} key={i}>
          {dt}
        </MenuItem>
      );
    });
  };
  const renderOptionsForProvince = () => {
    return provinces.map((dt, i) => {
      return (
        <MenuItem value={dt} key={i}>
          {dt}
        </MenuItem>
      );
    });
  };
  const renderOptionsForCity = () => {
    return cities.map((dt, i) => {
      return (
        <MenuItem value={dt} key={i}>
          {dt}
        </MenuItem>
      );
    });
  };
  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
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
                  <Grid item xs={12} sm={12} md={9}>
                    <h2>
                      [Edit] Apply Job Details For # {jobApp_.jobApplicationId}
                    </h2>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Button
                      onClick={handleEdit}
                      variant="contained"
                      color="primary"
                      type="button"
                    >
                      <EditIcon />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.btnClose}
                      variant="contained"
                      type="button"
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </Button>
                  </Grid>

                  <p></p>
                  <Grid item xs={12} sm={12} md={12}>
                    {jobAppEditResponse &&
                    jobAppEditResponse.responseCode === -1 ? (
                      <div className={classes.jobAppEditError}>
                        {jobAppEditResponse.responseMessage}
                      </div>
                    ) : (
                      <span>
                        {jobAppEditResponse.responseCode === 0 ? (
                          <div className={classes.jobAppEditSuccess}>
                            {jobAppEditResponse.responseMessage}
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </span>
                    )}
                    {modelErrors.length > 1 ? (
                      <div className={classes.modelError}>{modelErrorList}</div>
                    ) : (
                      <span>
                        {modelErrors.length === 1 ? (
                          <div className={classes.jobAppEditError}>
                            {modelErrors[0]}
                          </div>
                        ) : (
                          <span></span>
                        )}
                      </span>
                    )}
                  </Grid>
                </Grid>
                <p></p>
                <form>
                  <div className={classes.detailsDiv}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <TextField
                            id="companyName-input"
                            name="companyName"
                            label="Company-Name"
                            type="text"
                            value={jobApp_.companyName}
                            onChange={(e) =>
                              setField("companyName", e.target.value)
                            }
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <TextField
                            id="agencyName-input"
                            name="agencyName"
                            label="Agency-Name"
                            type="text"
                            value={jobApp_.agencyName}
                            onChange={(e) =>
                              setField("agencyName", e.target.value)
                            }
                          />
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <TextField
                            id="webURL-input"
                            name="webURL"
                            label="Web-URL"
                            type="text"
                            value={jobApp_.webURL}
                            onChange={(e) => setField("webURL", e.target.value)}
                          />
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          {" "}
                          <TextField
                            id="contactPersonName-input"
                            name="contactPersonName"
                            label="Contact-Person"
                            type="text"
                            value={jobApp_.contactPersonName}
                            onChange={(e) =>
                              setField("contactPersonName", e.target.value)
                            }
                          />
                          {!jobApp_.contactPersonName &&
                            errors.contactPersonName && (
                              <FormHelperText className={classes.controlError}>
                                {" "}
                                {errors.contactPersonName}
                              </FormHelperText>
                            )}
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <TextField
                            id="contactEmail-input"
                            name="contactEmail"
                            label="Contact-Email"
                            type="text"
                            value={jobApp_.contactEmail}
                            onChange={(e) =>
                              setField("contactEmail", e.target.value)
                            }
                          />
                          {!jobApp_.contactEmail && errors.contactEmail && (
                            <FormHelperText className={classes.controlError}>
                              {" "}
                              {errors.contactEmail}
                            </FormHelperText>
                          )}
                          {jobApp_.contactEmail && errors.contactEmail && (
                            <FormHelperText className={classes.controlError}>
                              {errors.contactEmail}
                            </FormHelperText>
                          )}
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <TextField
                            id="phoneNumber-input"
                            name="phoneNumber"
                            label="Phone-Number"
                            type="text"
                            value={jobApp_.phoneNumber}
                            onChange={(e) =>
                              setField("phoneNumber", e.target.value)
                            }
                          />
                          {jobApp_.phoneNumber && errors.phoneNumber && (
                            <FormHelperText className={classes.controlError}>
                              {" "}
                              {errors.phoneNumber}
                            </FormHelperText>
                          )}
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <InputLabel shrink>Province</InputLabel>
                          <Select
                            displayEmpty
                            value={jobApp_.province}
                            name="province"
                            onChange={(e) =>
                              setField("province", e.target.value)
                            }
                            style={{ marginTop: 5 }}
                          >
                            <MenuItem value="">
                              <em>---Select Province---</em>
                            </MenuItem>
                            {renderOptionsForProvince()}
                          </Select>
                          {!jobApp_.province && errors.province && (
                            <FormHelperText className={classes.controlError}>
                              {" "}
                              {errors.province}
                            </FormHelperText>
                          )}
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <InputLabel shrink>City</InputLabel>
                          <Select
                            renderValue={(value) =>
                              value ? value : <em>---Select City---</em>
                            }
                            displayEmpty
                            value={jobApp_.city}
                            name="city"
                            onChange={(e) => setField("city", e.target.value)}
                            style={{ marginTop: 5 }}
                          >
                            <MenuItem value="">
                              <em>---Select City---</em>
                            </MenuItem>
                            {renderOptionsForCity()}
                          </Select>
                          {!jobApp_.city && errors.city && (
                            <FormHelperText className={classes.controlError}>
                              {" "}
                              {errors.city}
                            </FormHelperText>
                          )}
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              fullWidth
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              id="date-picker-inline"
                              label="Applied On"
                              value={jobApp_.appliedOn}
                              onChange={(e) => setField("appliedOn", e)}
                            />
                          </MuiPickersUtilsProvider>
                          {!jobApp_.appliedOn && errors.appliedOn && (
                            <FormHelperText className={classes.controlError}>
                              {" "}
                              {errors.appliedOn}
                            </FormHelperText>
                          )}
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <InputLabel shrink>App-Status</InputLabel>
                          <Select
                            className={classes.appStatusGrp}
                            displayEmpty
                            value={jobApp_.appStatus}
                            name="appStatus"
                            onChange={(e) =>
                              setField("appStatus", e.target.value)
                            }
                            style={{ marginTop: 5 }}
                          >
                            <MenuItem value="">
                              <em>---Select App-Status---</em>
                            </MenuItem>
                            {renderOptionsForAppStatusTypes()}
                          </Select>
                          {!jobApp_.appStatus && errors.appStatus && (
                            <FormHelperText className={classes.controlError}>
                              {" "}
                              {errors.appStatus}
                            </FormHelperText>
                          )}
                        </Paper>
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Paper className={classes.paper}>
                          <TextArea
                            id="notes-input"
                            name="followUpNotes"
                            label="Notes!"
                            type="text"
                            value={
                              jobApp_.followUpNotes ? jobApp_.followUpNotes : ""
                            }
                            onChange={(e) =>
                              setField("followUpNotes", e.target.value)
                            }
                          />
                        </Paper>
                      </Grid>
                      {jobApp_.appStatus !== prevAppStatus && (
                        <Grid item xs={12} sm={12} md={6}>
                          <Paper className={classes.paper}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                className={classes.appStatusGrp}
                                disableToolbar
                                fullWidth
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="App-Status Changed-On"
                                value={jobApp_.appStatusChangedOn}
                                onChange={(e) =>
                                  setField("appStatusChangedOn", e)
                                }
                              />
                            </MuiPickersUtilsProvider>
                            {!jobApp_.appStatusChangedOn &&
                              errors.appStatusChangedOn && (
                                <FormHelperText
                                  className={classes.controlError}
                                >
                                  {" "}
                                  {errors.appStatusChangedOn}
                                </FormHelperText>
                              )}
                          </Paper>
                        </Grid>
                      )}
                    </Grid>
                  </div>
                </form>
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
  };
};

export default connect(mapStateToProps, {
  getAppStatusTypes,
})(Edit_JobApp);
