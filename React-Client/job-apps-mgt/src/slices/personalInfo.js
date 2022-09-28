import { createSlice } from "@reduxjs/toolkit";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  province: "",
  city: "",
};
const initialState = defaultValues;

export const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state = action.payload;
      return state;
    },
    getPersonalInfo: (state, action) => {
      return state;
    },
  },
});

export const { setPersonalInfo, getPersonalInfo } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
