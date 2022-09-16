import { ActionTypes } from "../constants/action-types";

export const setJobApps = (jobAppsData) => {
  return {
    type: ActionTypes.SET_JOB_APPS,
    payload: jobAppsData,
  };
};
