import { createSlice } from "@reduxjs/toolkit";

export const workExperienceSlice = createSlice({
  name: "workExperience",
  initialState: [],
  reducers: {
    setWorkExperience: (state, action) => {
      state.push(action.payload);
    },
    edittWorkExperience: (state, action) => {
      const index = state.findIndex(
        (wo) => wo.employerName === action.payload.employerName
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
  },
});

// this is for dispatch
export const { setWorkExperience, edittWorkExperience } = workExperienceSlice.actions;

// this is for configureStore
export default workExperienceSlice.reducer;