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
}));

const defaultValues = { 
  contactPersonName: "", 
  province: "",
  city: "",
};
const Filter_Job_Apps = (props) => {
  props.func("This is search child component");

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

  const searchJobApp = () => {
    console.log("search job app,,,", searchObject);
  
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
                    searchJobApp(e);
                  }}
                >
                  Search Job-App
                </Button>
              </div>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={3}>
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
                <Grid item xs={12} sm={12} md={3}>
                  <Paper className={classes.paper}>
                    <InputLabel shrink>Province</InputLabel>
                    <Select
                      renderValue={(value) =>
                        value ? value : <em>---Select Province---</em>
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
                <Grid item xs={12} sm={12} md={3}>
                  <Paper className={classes.paper}>
                    <InputLabel shrink>City</InputLabel>
                    <Select
                      renderValue={(value) =>
                        value ? value : <em>---Select City---</em>
                      }
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
