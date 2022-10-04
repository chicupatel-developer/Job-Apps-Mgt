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

import { getCountries } from "../../services/local.service";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import moment from "moment";

// redux
import { useSelector, useDispatch } from "react-redux";
import { edittEducation } from "../../slices/education";

const useStyles = makeStyles((theme) => ({
  eduEditError: {
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
  eduEditSuccess: {
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

const Education_Edit = (props) => {
  const classes = useStyles();

  // redux
  const education = useSelector((state) => state.education);
  const dispatch = useDispatch();

  const [eduEditResponse, setEduEditResponse] = useState({});

  // incoming from parent - edu-create component
  const { edu } = props;

  // this will contain edited values for edu
  const [eduEdit, setEduEdit] = useState(edu);

  const [errors, setErrors] = useState({});

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("loading edu-edit-component,,,", edu);

    setCountries(getCountries());

    return () => {};
  }, []);

  const cancelEdit = () => {
    setEduEdit(null);
    // callback as props
    props.func(eduEdit);
  };
  const renderOptionsForCountry = () => {
    return countries.map((dt, i) => {
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

    setEduEdit({
      ...eduEdit,
      [controlName]: e,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEduEdit({
      ...eduEdit,
      [name]: value,
    });
  };

  const findFormErrors = () => {
    const { degreeName, startDate, endDate, universityName, major, country } =
      edu;
    const newErrors = {};

    return newErrors;
  };

  const editEducation = (event) => {
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      setErrors({});

      // edit eduEdit
      console.log("edited eduEdit,,,", eduEdit);
      dispatch(edittEducation(eduEdit));
    }
  };

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <div>
            {eduEditResponse && eduEditResponse.responseCode === -1 ? (
              <div className={classes.eduEditError}>
                {eduEditResponse.responseMessage}
              </div>
            ) : (
              <span>
                {eduEditResponse && eduEditResponse.responseCode === 0 ? (
                  <div className={classes.eduEditSuccess}>
                    {eduEditResponse.responseMessage}
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
                      id="degreeName-input"
                      name="degreeName"
                      label="Degree-Name"
                      type="text"
                      value={eduEdit.degreeName}
                      onChange={handleInputChange}
                    />
                    {!eduEdit.degreeName && errors.degreeName && (
                      <FormHelperText className={classes.controlError}>
                        {" "}
                        {errors.degreeName}
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
                        value={eduEdit.endDate}
                        onChange={(e) => {
                          handleDateChange(e, "endDate");
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    {!eduEdit.endDate && errors.endDate && (
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
                        value={eduEdit.startDate}
                        onChange={(e) => {
                          handleDateChange(e, "startDate");
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    {!eduEdit.startDate && errors.startDate && (
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
                      id="universityName-input"
                      name="universityName"
                      label="University-Name"
                      value={eduEdit.universityName}
                      onChange={handleInputChange}
                    />
                    {eduEdit.universityName && errors.universityName && (
                      <FormHelperText className={classes.controlError}>
                        {" "}
                        {errors.universityName}
                      </FormHelperText>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={2}></Grid>

                <Grid item xs={12} sm={12} md={2}></Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Paper className={classes.paper}>
                    <InputLabel shrink>Country</InputLabel>
                    <Select
                      displayEmpty
                      value={eduEdit.country}
                      name="country"
                      onChange={handleInputChange}
                      style={{ marginTop: 5 }}
                    >
                      <MenuItem value="">
                        <em>---Select Country---</em>
                      </MenuItem>
                      {renderOptionsForCountry()}
                    </Select>
                    {!eduEdit.country && errors.country && (
                      <FormHelperText className={classes.controlError}>
                        {" "}
                        {errors.country}
                      </FormHelperText>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Paper className={classes.paper}>
                    {" "}
                    <TextField
                      id="major-input"
                      name="major"
                      label="Major-Name"
                      value={eduEdit.major}
                      onChange={handleInputChange}
                    />
                    {eduEdit.major && errors.major && (
                      <FormHelperText className={classes.controlError}>
                        {" "}
                        {errors.major}
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
                        editEducation(e);
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

export default Education_Edit;
