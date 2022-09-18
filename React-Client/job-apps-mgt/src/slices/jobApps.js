import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JobApplicationService from "../services/job.application.service";

const initialState = [];

export const retrieveJobApps = createAsyncThunk(
  "jobApps/retrieve",
  async () => {
    const res = await JobApplicationService.getAllJobApps();
    return res.data;
  }
);

export const createJobApp = createAsyncThunk("jobApp/create", async (data) => {
  // const res = await JobApplicationService.addJobApplication(data);
  // console.log(res.data);
  return data;
});

// action = { type, payload }
const jobAppsSlice = createSlice({
  name: "jobApps",
  initialState,
  extraReducers: {
    [retrieveJobApps.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [createJobApp.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer } = jobAppsSlice;
export default reducer;
