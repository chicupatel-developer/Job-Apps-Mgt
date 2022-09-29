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

import { makeStyles } from "@material-ui/core";

import { getProvinces, getCities } from "../../services/local.service";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setPersonalInfo } from "../../slices/personalInfo";

const useStyles = makeStyles((theme) => ({
  piCreateError: {
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
  piCreateSuccess: {
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
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  province: "",
  city: "",
};

const Personal_Info = () => {
  const classes = useStyles();

  // redux
  const personalInfo = useSelector((state) => state.personalInfo);
  const dispatch = useDispatch();

  const [piCreateResponse, setPiCreateResponse] = useState({});
  const [pInfo, setPInfo] = useState(defaultValues);
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
      pInfo.city = "";
    }

    setPInfo({
      ...pInfo,
      [name]: value,
    });
  };

  const resetForm = (e) => {
    setErrors({});
    setPInfo(defaultValues);
    setPiCreateResponse({});
  };

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

  const findFormErrors = () => {
    const { firstName, lastName, email, phoneNumber, province, city } = pInfo;
    const newErrors = {};

    if (!firstName || firstName === "")
      newErrors.firstName = "First-Name is Required!";
    if (!lastName || lastName === "")
      newErrors.lastName = "Last-Name is Required!";

    if (!email || email === "") newErrors.email = "Email is Required!";
    if (!(!email || email === "")) {
      if (!checkForEmail(email)) {
        newErrors.email = "Invalid Email!";
      } else {
        var key = "email";
        delete newErrors[key];
      }
    }

    if (!province || province === "")
      newErrors.province = "Province is Required!";
    if (!city || city === "") newErrors.city = "City is Required!";

    if (!(!phoneNumber || phoneNumber === "")) {
      if (!checkForPhoneNumber(phoneNumber))
        newErrors.phoneNumber = "Invalid Phone Number!";
    }

    return newErrors;
  };

  const savePersonalInfo = (event) => {
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      setErrors({});
      console.log(pInfo);

      // save this personal-info @ redux-store
      dispatch(setPersonalInfo(pInfo));
    }
  };

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div className={classes.pageTitle}>Personal-Info</div>
          <p></p>
          {piCreateResponse && piCreateResponse.responseCode === -1 ? (
            <div className={classes.piCreateError}>
              {piCreateResponse.responseMessage}
            </div>
          ) : (
            <span>
              {piCreateResponse && piCreateResponse.responseCode === 0 ? (
                <div className={classes.piCreateSuccess}>
                  {piCreateResponse.responseMessage}
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
      <form>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={2}></Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className={classes.paper}>
              <TextField
                id="firstName-input"
                name="firstName"
                label="First-Name"
                type="text"
                value={pInfo.firstName}
                onChange={handleInputChange}
              />
              {!pInfo.firstName && errors.firstName && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.firstName}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className={classes.paper}>
              {" "}
              <TextField
                id="lastName-input"
                name="lastName"
                label="Last-Name"
                type="text"
                value={pInfo.lastName}
                onChange={handleInputChange}
              />
              {!pInfo.lastName && errors.lastName && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.lastName}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={2}></Grid>

          <Grid item xs={12} sm={12} md={2}></Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className={classes.paper}>
              <TextField
                id="email-input"
                name="email"
                label="Email"
                type="text"
                value={pInfo.email}
                onChange={handleInputChange}
              />
              {!pInfo.email && errors.email && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.email}
                </FormHelperText>
              )}
              {pInfo.email && errors.email && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.email}
                </FormHelperText>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className={classes.paper}>
              {" "}
              <TextField
                id="phoneNumber-input"
                name="phoneNumber"
                label="Phone-Number"
                type="text"
                value={pInfo.phoneNumber}
                onChange={handleInputChange}
              />
              {pInfo.phoneNumber && errors.phoneNumber && (
                <FormHelperText className={classes.controlError}>
                  {" "}
                  {errors.phoneNumber}
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
                value={pInfo.province}
                name="province"
                onChange={handleInputChange}
                style={{ marginTop: 5 }}
              >
                <MenuItem value="">
                  <em>---Select Province---</em>
                </MenuItem>
                {renderOptionsForProvince()}
              </Select>
              {!pInfo.province && errors.province && (
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
                value={pInfo.city}
                name="city"
                onChange={handleInputChange}
                style={{ marginTop: 5 }}
              >
                <MenuItem value="">
                  <em>---Select City---</em>
                </MenuItem>
                {renderOptionsForCity()}
              </Select>
              {!pInfo.city && errors.city && (
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
                  savePersonalInfo(e);
                }}
              >
                <SaveIcon />
                &nbsp;Save!
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Personal_Info;
