import { createSlice } from "@reduxjs/toolkit";

export const educationSlice = createSlice({
  name: "education",
  initialState: [],
  reducers: {
    setEducation: (state, action) => {
      state.push(action.payload);
    },
    edittEducation: (state, action) => {
      const index = state.findIndex(
        (wo) => wo.degreeName === action.payload.degreeName
      );
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    removeEducation: (state, action) => {
      let index = state.findIndex(
        ({ degreeName }) => degreeName === action.payload.degreeName
      );
      state.splice(index, 1);
    },
  },
});

// this is for dispatch
export const { setEducation, edittEducation, removeEducation } =
  educationSlice.actions;

// this is for configureStore
export default educationSlice.reducer;
