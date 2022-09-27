import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ResumeCreatorService from "../services/resume.creator.service";

const initialState = {};

export const savePersonalInfo = createAsyncThunk(
  "resumeCreator/savePersonalInfo",
  async (data) => {
    return data;
  }
);

export const getPersonalInfo = createAsyncThunk(
  "resumeCreator/getPersonalInfo",
  async () => {
    console.log("getting personal-info from redux-store,,,");
  }
);

// action = { type, payload }
const myResumeSlice = createSlice({
  name: "myResume",
  initialState,
  extraReducers: {
    [savePersonalInfo.fulfilled]: (state, action) => {
      console.log("saving,,,", action.payload);
      state = action.payload;
      /*
      state = {
        ...state,
        personalInfo: action.payload,
      };
      */
    },

    [getPersonalInfo.fulfilled]: (state, action) => {
      return state;
    },
  },
});

const { reducer } = myResumeSlice;
export default reducer;
