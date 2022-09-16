import { ActionTypes } from "../constants/action-types";
const intialState = {
  jobApps: [],
};

export const jobAppsReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_JOB_APPS:
      return { ...state, jobApps: payload };
    default:
      return state;
  }
};
