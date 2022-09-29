import { createSlice } from "@reduxjs/toolkit";

export const workExperienceSlice = createSlice({
  name: "workExperience",
  initialState: [],
  reducers: {
    setWorkExperience: (state, action) => {
      state.push(action.payload);
    },   
  },
});

// this is for dispatch
export const { setWorkExperience,  } =
  workExperienceSlice.actions;

// this is for configureStore
export default workExperienceSlice.reducer;
