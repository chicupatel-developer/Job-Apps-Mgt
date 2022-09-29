import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextArea from "@material-ui/core/TextareaAutosize";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import SaveIcon from "@material-ui/icons/Save";

import { makeStyles } from "@material-ui/core";

import { getProvinces, getCities } from "../../services/local.service";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import moment from "moment";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setWorkExperience,
  getWorkExperience,
} from "../../slices/workExperience";

const useStyles = makeStyles((theme) => ({
  woCreateError: {
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
  woiCreateSuccess: {
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
    width: "200px",
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
    border: "2px solid blue",
    borderRadius: "2px",
    backgroundColor: "lightyellow",
    color: "black",
    fontSize: "x-large; ",
  },
}));

const defaultValues = {
  employerName: "",
  startDate: null,
  endDate: null,
  jobDetails: [],
  province: "",
  city: "",
};
const Work_Experience_Create = () => {
  const classes = useStyles();

  // redux
  const workExperience = useSelector((state) => state.workExperience);
  const dispatch = useDispatch();
  const [allWos, setAllWos] = useState([]);

  const [woCreateResponse, setWoCreateResponse] = useState({});
  const [wo, setWo] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setProvinces(getProvinces());

    console.log(dispatch(getWorkExperience()));
  }, []);
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

  const handleDateChange = (e, controlName) => {
    console.log(e);
    let formattedDate = moment(e).format("DD/MM/YYYY");
    console.log(formattedDate);

    setWo({
      ...wo,
      [controlName]: e,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // console.log(name, value);
    if (name === "province" && value === "") {
      setCities([]);
    } else if (name === "province" && value !== "") {
      setCities(getCities(value));
      wo.city = "";
    }

    setWo({
      ...wo,
      [name]: value,
    });
  };

  const resetForm = (e) => {
    setErrors({});
    setWo(defaultValues);
    setWoCreateResponse({});
  };

  const findFormErrors = () => {
    const { employerName, startDate, endDate, jobDetails, province, city } = wo;
    const newErrors = {};

    return newErrors;
  };

  const saveWorkExperience = (event) => {
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      setErrors({});
      console.log(wo);

      // save this work-experience @ redux-store
      dispatch(setWorkExperience(wo));

      setAllWos(dispatch(getWorkExperience()));
    }
  };

  let displayAllWos =
    allWos.length > 0 &&
    allWos.map((item, i) => {
      return (
        <div key={i}>
          <span style={{ marginTop: 20 }}>
            {i + 1}) {item.employerName}
          </span>
        </div>
      );
    }, this);

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Work-Experience</div>
          <p></p>
          {woCreateResponse && woCreateResponse.responseCode === -1 ? (
            <div className={classes.woCreateError}>
              {woCreateResponse.responseMessage}
            </div>
          ) : (
            <span>
              {woCreateResponse && woCreateResponse.responseCode === 0 ? (
                <div className={classes.woCreateSuccess}>
                  {woCreateResponse.responseMessage}
                </div>
              ) : (
                <span></span>
              )}
            </span>
          )}
          <p></p>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>
      <p></p>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={2}></Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.paper}>
                  <TextField
                    id="employerName-input"
                    name="employerName"
                    label="Employer-Name"
                    type="text"
                    value={wo.employerName}
                    onChange={handleInputChange}
                  />
                  {!wo.employerName && errors.employerName && (
                    <FormHelperText className={classes.controlError}>
                      {" "}
                      {errors.employerName}
                    </FormHelperText>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.paper}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      fullWidth
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="End-Date"
                      value={wo.endDate}
                      onChange={(e) => {
                        handleDateChange(e, "endDate");
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {!wo.endDate && errors.endDate && (
                    <FormHelperText className={classes.controlError}>
                      {" "}
                      {errors.endDate}
                    </FormHelperText>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={2}></Grid>

              <Grid item xs={12} sm={12} md={2}></Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.paper}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      fullWidth
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Start-Date"
                      value={wo.startDate}
                      onChange={(e) => {
                        handleDateChange(e, "startDate");
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {!wo.startDate && errors.startDate && (
                    <FormHelperText className={classes.controlError}>
                      {" "}
                      {errors.startDate}
                    </FormHelperText>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.paper}>
                  {" "}
                  <TextArea
                    id="jobDetails-input"
                    name="jobDetails"
                    label="Job-Details"
                    type="text"
                    value={wo.jobDetails}
                    onChange={handleInputChange}
                  />
                  {wo.jobDetails && errors.jobDetails && (
                    <FormHelperText className={classes.controlError}>
                      {" "}
                      {errors.jobDetails}
                    </FormHelperText>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={2}></Grid>

              <Grid item xs={12} sm={12} md={2}></Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Paper className={classes.paper}>
                  <InputLabel shrink>Province</InputLabel>
                  <Select
                    displayEmpty
                    value={wo.province}
                    name="province"
                    onChange={handleInputChange}
                    style={{ marginTop: 5 }}
                  >
                    <MenuItem value="">
                      <em>---Select Province---</em>
                    </MenuItem>
                    {renderOptionsForProvince()}
                  </Select>
                  {!wo.province && errors.province && (
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
                    value={wo.city}
                    name="city"
                    onChange={handleInputChange}
                    style={{ marginTop: 5 }}
                  >
                    <MenuItem value="">
                      <em>---Select City---</em>
                    </MenuItem>
                    {renderOptionsForCity()}
                  </Select>
                  {!wo.city && errors.city && (
                    <FormHelperText className={classes.controlError}>
                      {" "}
                      {errors.city}
                    </FormHelperText>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12} sm={12} md={2}></Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.buttonPaper}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={(e) => {
                      saveWorkExperience(e);
                    }}
                  >
                    <SaveIcon />
                    &nbsp;Save!
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div>
            <h3>Employers</h3>
            <hr />
            <div>{displayAllWos}</div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Work_Experience_Create;
