import { createSlice } from "@reduxjs/toolkit";

export const skillsSlice = createSlice({
  name: "skills",
  initialState: [],
  reducers: {
    setSkills: (state, action) => {
      console.log(action.payload);
      state = action.payload;
      return state;
    },
    getSkills: (state, action) => {
      return state;
    },
  },
});

export const { setSkills, getSkills } = skillsSlice.actions;

export default skillsSlice.reducer;
