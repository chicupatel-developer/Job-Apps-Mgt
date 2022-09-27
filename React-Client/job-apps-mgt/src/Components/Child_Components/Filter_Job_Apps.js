import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormHelperText from "@material-ui/core/FormHelperText";

import { makeStyles } from "@material-ui/core";

import JobApplicationService from "../../services/job.application.service";
import { getProvinces, getCities } from "../../services/local.service";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    // textAlign: "center",
    textAlign: "left",
    // color: theme.palette.text.secondary,
  },
  pageHeader: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "lightyellow",
    color: "green",
    fontSize: "large; ",
  },
  btn: {
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "lightskyblue",
    width: "300px",
    color: "black",
    fontSize: "large",
  },
  buttonPaper: {
    textAlign: "center",
    paddingBottom: "20px",
  },
  controlError: {
    color: "red",
    fontSize: "medium; ",
  },
}));

const defaultValues = {
  contactPersonName: "",
  province: "",
  city: "",
  startDate: null,
  endDate: null,
};
const Filter_Job_Apps = (props) => {
  const { jobApps } = props;

  const classes = useStyles();

  const [searchObject, setSearchObject] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setProvinces(getProvinces());
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // console.log(name, value);
    if (name === "province" && value === "") {
      setCities([]);
    } else if (name === "province" && value !== "") {
      setCities(getCities(value));
      searchObject.city = "";
    }

    setSearchObject({
      ...searchObject,
      [name]: value,
    });
  };
  const handleDateChange = (e, propName) => {
    console.log(e, propName);
    let formattedDate = moment(e).format("DD/MM/YYYY");
    console.log(formattedDate);

    setSearchObject({
      ...searchObject,
      [propName]: e,
    });
  };

  const findFormErrors = () => {
    const { startDate, endDate } = searchObject;
    const newErrors = {};

    if (
      startDate !== "" &&
      startDate !== null &&
      endDate !== "" &&
      endDate !== null
    ) {
      if (startDate > endDate) {
        newErrors.dateError = "Invalid Dates!";
      } else {
        delete newErrors.dateError;
      }
    }

    return newErrors;
  };

  const allJobApps = () => {
    setSearchObject(defaultValues);

    // callback as props
    // returns all job-Apps[] & no-search(false)
    props.func(jobApps, false);
  };
  const searchJobApps = () => {
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
      return;
    } else {
      setErrors({});
      console.log("search job app,,,", searchObject);
    }

    var jobApps_ = jobApps;

    if (searchObject.contactPersonName !== "") {
      jobApps_ = jobApps_.filter(function (job) {
        return job.contactPersonName === searchObject.contactPersonName;
      });
    }

    if (searchObject.province !== "") {
      jobApps_ = jobApps_.filter(function (job) {
        return job.province === searchObject.province;
      });
    }

    if (searchObject.city !== "") {
      jobApps_ = jobApps_.filter(function (job) {
        return job.city === searchObject.city;
      });
    }

    if (
      searchObject.startDate !== null &&
      searchObject.startDate !== "" &&
      searchObject.endDate !== null &&
      searchObject.endDate !== ""
    ) {
      jobApps_ = jobApps_.filter(function (job) {
        return (
          moment(job.appliedOn).format("YYYY-MM-DD") <=
            moment(searchObject.endDate).format("YYYY-MM-DD") &&
          moment(job.appliedOn).format("YYYY-MM-DD") >=
            moment(searchObject.startDate).format("YYYY-MM-DD")
        );
      });
    }

    // callback as props
    // returns searched job-Apps[] & search(true)
    props.func(jobApps_, true);
  };
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}></Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
      </Grid>
      <form>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={1}></Grid>
          <Grid item xs={12} sm={12} md={10}>
            <div className={classes.pageHeader}>
              <div className={classes.buttonPaper}>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={(e) => {
                    searchJobApps(e);
                  }}
                >
                  Search Job-Apps!
                </Button>
                &nbsp;
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={(e) => {
                    allJobApps(e);
                  }}
                >
                  All Job-Apps*
                </Button>
              </div>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={2}>
                  <Paper className={classes.paper}>
                    {" "}
                    <TextField
                      id="contactPersonName-input"
                      name="contactPersonName"
                      label="Contact-Person"
                      type="text"
                      value={searchObject.contactPersonName}
                      onChange={handleInputChange}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <Paper className={classes.paper}>
                    <InputLabel shrink>Province</InputLabel>
                    <Select
                      renderValue={(value) =>
                        value ? value : <em>-Province-</em>
                      }
                      value={searchObject.province}
                      displayEmpty
                      name="province"
                      onChange={handleInputChange}
                      style={{ marginTop: 5 }}
                    >
                      <MenuItem value="">
                        <em>---Select Province---</em>
                      </MenuItem>
                      {renderOptionsForProvince()}
                    </Select>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={2}>
                  <Paper className={classes.paper}>
                    <InputLabel shrink>City</InputLabel>
                    <Select
                      renderValue={(value) => (value ? value : <em>-City-</em>)}
                      value={searchObject.city}
                      displayEmpty
                      name="city"
                      onChange={handleInputChange}
                      style={{ marginTop: 5 }}
                    >
                      <MenuItem value="">
                        <em>---Select City---</em>
                      </MenuItem>
                      {renderOptionsForCity()}
                    </Select>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Paper className={classes.paper}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        fullWidth
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Start Date"
                        value={searchObject.startDate}
                        onChange={(e) => {
                          handleDateChange(e, "startDate");
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={3}>
                  <Paper className={classes.paper}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        fullWidth
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="End Date"
                        value={searchObject.endDate}
                        onChange={(e) => {
                          handleDateChange(e, "endDate");
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    {searchObject.startDate &&
                    searchObject.endDate &&
                    errors.dateError ? (
                      <FormHelperText className={classes.controlError}>
                        {" "}
                        {errors.dateError}
                      </FormHelperText>
                    ) : (
                      <span></span>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={1}></Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Filter_Job_Apps;
