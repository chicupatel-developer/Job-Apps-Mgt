import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
  // edittWorkExperience,
  removeWorkExperience,
} from "../../slices/workExperience";

// child component for edit wo
import Work_Experience_Edit from "./Work_Experience_Edit";

const useStyles = makeStyles((theme) => ({
  woCrDelError: {
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
  woCrDelSuccess: {
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
  btnEdit: {
    textAlign: "center",
    verticalAlign: "middle",
    color: "blue",
    fontSize: "medium",
    marginBottom: "5px",
  },
  btnDelete: {
    color: "black",
    backgroundColor: "orange",
    marginBottom: "5px",
  },
  opHeader: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "5px",
    paddingTop: "5px",
    paddingBottom: "5px",
    marginBottom: "5px",
    border: "2px solid blue",
    borderRadius: "2px",
    backgroundColor: "lightyellow",
    color: "black",
    fontSize: "medium",
  },
  employerList: {
    fontSize: "large",
    color: "blue",
    fontStyle: "bold",
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

  const [woCrDelResponse, setWoCrDelResponse] = useState({});
  const [wo, setWo] = useState(defaultValues);

  const [woEditFlag, setWoEditFlag] = useState(false);
  const [woEdit, setWoEdit] = useState({});

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

  // callback from wo-edit
  const callBackEditWo = (data) => {
    setWoEditFlag(false);
    console.log("just edited wo,,,", data);
  };

  // create
  const handleDateChange = (e, controlName) => {
    console.log(e);
    let formattedDate = moment(e).format("DD/MM/YYYY");
    console.log(formattedDate);

    setWo({
      ...wo,
      [controlName]: e,
    });

    /*
    if (woEditFlag) {
      let formattedDate = moment(e).format("DD/MM/YYYY");
      console.log(formattedDate);
      setWoEdit({
        ...woEdit,
        [controlName]: e,
      });
    } else {
      let formattedDate = moment(e).format("DD/MM/YYYY");
      console.log(formattedDate);
      setWo({
        ...wo,
        [controlName]: e,
      });
    }
    */
  };

  // create
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
    /*
    if (woEditFlag) {
      // edit
      if (name === "province" && value === "") {
        setCities([]);
      } else if (name === "province" && value !== "") {
        setCities(getCities(value));
        woEdit.city = "";
      }
      setWoEdit({
        ...woEdit,
        [name]: value,
      });
    } else {
      // create
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
    }
    */
  };

  const resetForm = (e) => {
    setErrors({});
    // setWo(defaultValues);
    // setWoEdit({});
    setWoCrDelResponse({});
  };

  // create
  const findFormErrors = () => {
    const { employerName, startDate, endDate, jobDetails, province, city } = wo;
    const newErrors = {};

    return newErrors;
    /*
    if (woEditFlag) {
      const { employerName, startDate, endDate, jobDetails, province, city } =
        woEdit;
      const newErrors = {};
      return newErrors;
    } else {
      const { employerName, startDate, endDate, jobDetails, province, city } =
        wo;
      const newErrors = {};
      return newErrors;
    }
    */
  };

  // create
  const saveWorkExperience = (event) => {
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      setErrors({});

      /*
      if (woEditFlag) {
        // edit woEdit
        console.log("edited woEdit,,,", woEdit);
        dispatch(edittWorkExperience(woEdit));
        setWoEditFlag(false);
      } else {
        // create wo
        // save this work-experience @ redux-store
        console.log("created wo,,,", wo);
        dispatch(setWorkExperience(wo));
      }
      */

      // create wo
      // save this work-experience @ redux-store
      console.log("created wo,,,", wo);
      dispatch(setWorkExperience(wo));

      setWoCrDelResponse({
        responseCode: 0,
        responseMessage: "Work-Experience Created @Redux-Store !",
      });
      setWo(defaultValues);

      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  };

  // make-ready for edit
  const editWorkExperience = (e, wo) => {
    console.log("edit wo,,,", wo);
    if (wo !== null) {
      setWoEditFlag(true);
      setWoEdit({ ...wo });
    }
  };

  // delete
  const deleteWorkExperience = (e, woex) => {
    console.log("delete wo,,,", woex);

    if (woex !== null) {
      // delete wo
      console.log("deleted wo,,,", woex);
      dispatch(removeWorkExperience(woex));

      setWoCrDelResponse({
        responseCode: 0,
        responseMessage: "Work-Experience Deleted @Redux-Store !",
      });

      setTimeout(() => {
        resetForm();
      }, 2000);
    }
  };

  let displayAllWos =
    workExperience.length > 0 &&
    workExperience.map((item, i) => {
      return (
        <div key={i}>
          <span style={{ marginTop: 20 }}>
            <Button
              className={classes.btnEdit}
              variant="contained"
              type="button"
              onClick={(e) => {
                editWorkExperience(e, item);
              }}
            >
              <EditIcon />
            </Button>
            &nbsp;
            <Button
              className={classes.btnDelete}
              variant="contained"
              type="button"
              onClick={(e) => {
                deleteWorkExperience(e, item);
              }}
            >
              <DeleteForeverIcon />
            </Button>
            &nbsp;{" "}
            <span className={classes.employerList}>{item.employerName}</span>
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
          <div className={classes.pageTitle}>
            Work-Experience
            {woEditFlag ? (
              <span>&nbsp;[Edit]</span>
            ) : (
              <span>&nbsp;[Create]</span>
            )}
          </div>
          <p></p>
          {woCrDelResponse && woCrDelResponse.responseCode === -1 ? (
            <div className={classes.woCrDelError}>
              {woCrDelResponse.responseMessage}
            </div>
          ) : (
            <span>
              {woCrDelResponse && woCrDelResponse.responseCode === 0 ? (
                <div className={classes.woCrDelSuccess}>
                  {woCrDelResponse.responseMessage}
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
        {woEditFlag ? (
          <Grid item xs={12} sm={12} md={12}>
            <div>
              {/*
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
                          saveWorkExperience(e);
                        }}
                      >
                        <SaveIcon />
                        &nbsp;Edit
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
              */}
              <Work_Experience_Edit wo={woEdit} func={callBackEditWo} />
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} md={9}>
            <div>
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
                      <TextField
                        id="jobDetails-input"
                        name="jobDetails"
                        label="Job-Details"
                        multiline
                        maxRows={4}
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
                        &nbsp;Create
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={3}>
          {!woEditFlag && (
            <div>
              <h3>Employers</h3>
              <hr />
              <div>{displayAllWos}</div>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Work_Experience_Create;
