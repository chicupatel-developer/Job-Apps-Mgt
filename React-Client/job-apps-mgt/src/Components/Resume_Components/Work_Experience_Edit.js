import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

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
import { edittWorkExperience } from "../../slices/workExperience";

const useStyles = makeStyles((theme) => ({
  woEditError: {
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
  woEditSuccess: {
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
    width: "120px",
    color: "black",
    fontSize: "medium",
  },
  cancelBtn: {
    textAlign: "center",
    verticalAlign: "middle",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "orange",
    width: "120px",
    color: "black",
    fontSize: "medium",
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
  btnEdit: {
    textAlign: "center",
    verticalAlign: "middle",
    color: "blue",
    fontSize: "medium",
    marginBottom: "5px",
  },
}));

const Work_Experience_Edit = (props) => {
  const classes = useStyles();

  // redux
  const workExperience = useSelector((state) => state.workExperience);
  const dispatch = useDispatch();

  const [woEditResponse, setWoEditResponse] = useState({});

  // incoming from parent - wo-create component
  const { wo } = props;

  // this will contain edited values for wo
  const [woEdit, setWoEdit] = useState(wo);

  const [errors, setErrors] = useState({});

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    console.log("loading wo-edit-component,,,", wo);

    setProvinces(getProvinces());

    return () => {};
  }, []);

  const cancelEdit = () => {
    setWoEdit(null);
    // callback as props
    props.func(woEdit);
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

  const handleDateChange = (e, controlName) => {
    console.log(e);
    let formattedDate = moment(e).format("DD/MM/YYYY");
    console.log(formattedDate);

    setWoEdit({
      ...woEdit,
      [controlName]: e,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "province" && value === "") {
      setCities([]);
    } else if (name === "province" && value !== "") {
      setCities(getCities(value));
      woEdit.city = "";
    }

    console.log("running handle input change,,,");
    setWoEdit({
      ...woEdit,
      [name]: value,
    });
  };

  const findFormErrors = () => {
    const { employerName, startDate, endDate, jobDetails, province, city } =
      woEdit;
    const newErrors = {};

    return newErrors;
  };

  const editWorkExperience = (event) => {
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      setErrors({});

      // edit woEdit
      console.log("edited woEdit,,,", woEdit);
      dispatch(edittWorkExperience(woEdit));
    }
  };

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <div>
            {woEditResponse && woEditResponse.responseCode === -1 ? (
              <div className={classes.woEditError}>
                {woEditResponse.responseMessage}
              </div>
            ) : (
              <span>
                {woEditResponse && woEditResponse.responseCode === 0 ? (
                  <div className={classes.woEditSuccess}>
                    {woEditResponse.responseMessage}
                  </div>
                ) : (
                  <span></span>
                )}
              </span>
            )}
            <p></p>

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
                      value={woEdit.employerName}
                      onChange={handleInputChange}
                    />
                    {!woEdit.employerName && errors.employerName && (
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
                        value={woEdit.endDate}
                        onChange={(e) => {
                          handleDateChange(e, "endDate");
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    {!woEdit.endDate && errors.endDate && (
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
                        value={woEdit.startDate}
                        onChange={(e) => {
                          handleDateChange(e, "startDate");
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    {!woEdit.startDate && errors.startDate && (
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
                    <TextField
                      id="jobDetails-input"
                      name="jobDetails"
                      label="Job-Details"
                      multiline
                      maxRows={4}
                      value={woEdit.jobDetails}
                      onChange={handleInputChange}
                    />
                    {woEdit.jobDetails && errors.jobDetails && (
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
                      value={woEdit.province}
                      name="province"
                      onChange={handleInputChange}
                      style={{ marginTop: 5 }}
                    >
                      <MenuItem value="">
                        <em>---Select Province---</em>
                      </MenuItem>
                      {renderOptionsForProvince()}
                    </Select>
                    {!woEdit.province && errors.province && (
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
                      value={woEdit.city}
                      name="city"
                      onChange={handleInputChange}
                      style={{ marginTop: 5 }}
                    >
                      <MenuItem value="">
                        <em>---Select City---</em>
                      </MenuItem>
                      {renderOptionsForCity()}
                    </Select>
                    {!woEdit.city && errors.city && (
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
                        editWorkExperience(e);
                      }}
                    >
                      <EditIcon />
                      &nbsp;Edit
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      className={classes.cancelBtn}
                      variant="contained"
                      type="button"
                      onClick={(e) => {
                        cancelEdit(e);
                      }}
                    >
                      <CancelIcon />
                      &nbsp;Return
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Work_Experience_Edit;
