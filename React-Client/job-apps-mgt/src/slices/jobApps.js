import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JobApplicationService from "../services/job.application.service";

const initialState = [];

// api call
// update redux-jobApps[]
export const retrieveJobApps = createAsyncThunk(
  "jobApps/retrieve",
  async () => {
    const res = await JobApplicationService.getAllJobApps();
    return res.data;
  }
);

// after successful api call
// add data{} to redux-jobApps[]
export const createJobApp = createAsyncThunk("jobApp/create", async (data) => {
  return data;
});

// after successful api call
// edit data{} to redux-jobApps[]
export const editJobApp = createAsyncThunk("jobApp/edit", async (data) => {
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
    [editJobApp.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (jobApp) => jobApp.jobApplicationId === action.payload.jobApplicationId
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
  },
});

const { reducer } = jobAppsSlice;
export default reducer;
