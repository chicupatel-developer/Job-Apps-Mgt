import React, { useState, useEffect, useRef } from "react";

import Grid from "@material-ui/core/Grid";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
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
import EditIcon from "@material-ui/icons/Edit";

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
    width: 850,
    height: 600,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  jobAppCreateError: {
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
  jobAppCreateSuccess: {
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
  pageHeader: {},
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
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const Edit_JobApp = (props) => {
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
    props.func("edit job-app is closed");
  };

  useEffect(() => {
    console.log("child component,,," + jobApp.jobApplicationId);

    setProvinces(getProvinces());

    // retrieve values from redux-store
    // this will popup appStatusTypes from redux-store
    props.getAppStatusTypes();

    setJobApp_(jobApp);

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

    return newErrors;
  };
  const handleModelState = (error) => {
    var errors = [];
    if (error.response.status === 400) {
      if (error.response.data.errors === undefined) {
        console.log("Bad Request!!!");
        errors.push(error.response.data);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log(jobApp_);
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
        <option value={i} key={i} name={dt}>
          {dt}
        </option>
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
        style={{ alignItems: "center", justifyContent: "center" }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.modalPaper}>
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
                    <Button variant="contained" 
                      color="primary"
                      type="submit">
                      <EditIcon />
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      color="primary"
                      variant="contained"
                      type="button"
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </Button>
                  </Grid>
                </Grid>
                <form onSubmit={handleSubmit}>
                  <div className={classes.detailsDiv}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={4}>
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
                      <Grid item xs={12} sm={12} md={4}>
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
                      <Grid item xs={12} sm={12} md={4}>
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

                      <Grid item xs={12} sm={12} md={4}>
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
                      <Grid item xs={12} sm={12} md={4}>
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
                      <Grid item xs={12} sm={12} md={4}>
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

                      <Grid item xs={12} sm={12} md={4}>
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
                      <Grid item xs={12} sm={12} md={4}>
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
