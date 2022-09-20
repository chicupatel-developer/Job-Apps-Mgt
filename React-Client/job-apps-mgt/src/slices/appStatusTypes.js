import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JobApplicationService from "../services/job.application.service";

const initialState = [];

// api call
// update redux-appStatusTypes[]
export const retrieveAppStatusTypes = createAsyncThunk(
  "appStatusTypes/retrieve",
  async () => {
    const res = await JobApplicationService.getAppStatusTypes();
    return res.data;
  }
);

// after successful api call
// here data = [] of appStatusTypes
// update redux-appStatusTypes[]
export const setAppStatusTypes = createAsyncThunk(
  "appStatusTypes/set",
  async (data) => {
    console.log("now setting app-status-types @ redux-store,,,", data);
    return data;
  }
);

// update redux-appStatusTypes[]
export const getAppStatusTypes = createAsyncThunk(
  "appStatusTypes/get",
  async () => {
    console.log("getting app-status-types from redux-store,,,");
  }
);

// action = { type, payload }
const appStatusTypesSlice = createSlice({
  name: "appStatusTypes",
  initialState,
  extraReducers: {
    [retrieveAppStatusTypes.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [setAppStatusTypes.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getAppStatusTypes.fulfilled]: (state, action) => {
      return state;
    },
  },
});

const { reducer } = appStatusTypesSlice;
export default reducer;
