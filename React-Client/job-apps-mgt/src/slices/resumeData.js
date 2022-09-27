import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ResumeCreatorService from "../services/resume.creator.service";

const initialState = {};

export const savePersonalInfo = createAsyncThunk(
  "resumeCreator/savePersonalInfo",
  async (data) => {
    return data;
  }
);

// action = { type, payload }
const resumeDataSlice = createSlice({
  name: "myResume",
  initialState,
  extraReducers: {
    [savePersonalInfo.fulfilled]: (state, action) => {
      state = {
        ...state,
        personalInfo: action.payload,
      };
    },
  },
});

const { reducer } = resumeDataSlice;
export default reducer;
