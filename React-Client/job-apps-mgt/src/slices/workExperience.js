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
    removeWorkExperience: (state, action) => {
      let index = state.findIndex(
        ({ employerName }) => employerName === action.payload.employerName
      );
      state.splice(index, 1);
    },
  },
});

// this is for dispatch
export const { removeWorkExperience, setWorkExperience, edittWorkExperience } =
  workExperienceSlice.actions;

// this is for configureStore
export default workExperienceSlice.reducer;
