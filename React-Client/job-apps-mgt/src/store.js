import { configureStore } from "@reduxjs/toolkit";
import jobAppsReducer from "./slices/jobApps";
import appStatusTypesReducer from "./slices/appStatusTypes";
import personalInfoReducer from "./slices/personalInfo";
import skillsReducer from "./slices/skills";

import { getDefaultMiddleware } from "@reduxjs/toolkit";

/*
serializableStateInvariantMiddleware.ts:194 A non-serializable value 
was detected in an action, in the path: `payload.appliedOn`. 
Value: Sun Sep 18 2022 12:53:18 GMT-0500 (Central Daylight Time)
*/
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const reducer = {
  jobApps: jobAppsReducer,
  appStatusTypes: appStatusTypesReducer,
  personalInfo: personalInfoReducer,
  skills: skillsReducer,
};

const store = configureStore({
  reducer: reducer,
  middleware: customizedMiddleware,
  devTools: true,
});

export default store;
