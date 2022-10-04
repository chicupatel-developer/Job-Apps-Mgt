import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";

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
import {
  setEducation,
  edittEducation,
} from "../../slices/workExperience";

const Education_Create = () => {
  return <div></div>;
};

export default Education_Create;
