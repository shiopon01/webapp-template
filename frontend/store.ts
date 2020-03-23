import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";

import rootReducer from "./src/modules/reducers";

export default function initializeStore(initialState = {}) {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(logger, reduxThunk)));

  return store;
}
