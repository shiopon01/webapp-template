import { combineReducers } from "redux";

import snackbar from "./snackbar";
import auth from "./auth";

const reducers = combineReducers({
  snackbar,
  auth
});

export default reducers;
