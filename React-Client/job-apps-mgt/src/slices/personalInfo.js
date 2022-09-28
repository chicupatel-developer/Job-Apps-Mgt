import { createSlice } from "@reduxjs/toolkit";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  province: "",
  city: "",
};
// const initialState = defaultValues;

export const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState: {},
  reducers: {
    setPersonalInfo: (state, action) => {
      console.log("saving personal info,,,", action.payload);
      state = action.payload;
      console.log(state);
    },
    getPersonalInfo: (state) => {
      console.log("getting personal info,,,", state);
      return state;
    },
  },
});

export const { setPersonalInfo, getPersonalInfo } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
