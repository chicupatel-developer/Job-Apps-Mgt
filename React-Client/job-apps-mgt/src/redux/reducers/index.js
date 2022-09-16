import { combineReducers } from "redux";
import { jobAppsReducer } from "./jobAppsReducer";
const reducers = combineReducers({
  jobApps: jobAppsReducer,
});
export default reducers;
