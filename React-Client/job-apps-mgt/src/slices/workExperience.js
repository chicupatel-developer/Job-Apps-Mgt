import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const workExperienceSlice = createSlice({
  name: "workExperience",
  initialState,
  reducers: {
    setWorkExperience: (state, action) => {
      state = [...state, action.payload];
      console.log("setting wo,,,", state);
      return state;
    },
    getWorkExperience: (state, action) => {
      console.log("getting wo,,,", state);
      return state;
    },
  },
});

export const { setWorkExperience, getWorkExperience } =
  workExperienceSlice.actions;

export default workExperienceSlice.reducer;
