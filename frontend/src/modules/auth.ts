import axios from "axios";
import { showSnackbar } from "./snackbar";

// Actions
const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

const AUTH_LOGOUT_REQUEST = "AUTH_LOGOUT_REQUEST";
const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
const AUTH_LOGOUT_FAILURE = "AUTH_LOGOUT_FAILURE";

const AUTH_GET_USER_REQUEST = "AUTH_GET_USER_REQUEST";
const AUTH_GET_USER_SUCCESS = "AUTH_GET_USER_SUCCESS";
const AUTH_GET_USER_FAILURE = "AUTH_GET_USER_FAILURE";

// Action Creators
export const login = (userid: string, password: string) => (dispatch: any) => {
  dispatch(loginRequest());

  return axios
    .post(`/api/login`, {
      userid,
      password
    })
    .then(res => {
      sessionStorage.setItem("authToken", res.data.token);
      dispatch(loginSuccess(res.data));
      dispatch(showSnackbar("login success"));
    })
    .catch(err => {
      dispatch(loginFailure(err));
      dispatch(showSnackbar("login failure", "error"));
    });
};

const loginRequest = () => ({
  type: AUTH_LOGIN_REQUEST
});

const loginSuccess = (payload: any) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload
});

const loginFailure = (payload: any) => ({
  type: AUTH_LOGIN_FAILURE,
  payload
});

export const logout = () => (dispatch: any) => {
  dispatch(logoutRequest());

  return axios
    .post(
      `/api/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`
        }
      }
    )
    .then(res => {
      sessionStorage.removeItem("authToken");
      dispatch(logoutSuccess(res.data));
      dispatch(showSnackbar("logout success"));
    })
    .catch(err => {
      dispatch(logoutFailure(err));
      dispatch(showSnackbar("logout failure", "error"));
    });
};

const logoutRequest = () => ({
  type: AUTH_LOGOUT_REQUEST
});

const logoutSuccess = (payload: any) => ({
  type: AUTH_LOGOUT_SUCCESS,
  payload
});

const logoutFailure = (payload: any) => ({
  type: AUTH_LOGOUT_FAILURE,
  payload
});

export const getUser = () => (dispatch: any) => {
  dispatch(getUserRequest());

  return axios
    .post(
      `/api/user`,
      {},
      {
        headers: {
          Authorization: `${sessionStorage.getItem("authToken")}`
        }
      }
    )
    .then(res => {
      dispatch(getUserSuccess(res.data));
    })
    .catch(err => {
      dispatch(getUserFailure(err));
    });
};

const getUserRequest = () => ({
  type: AUTH_GET_USER_REQUEST
});

const getUserSuccess = (payload: any) => ({
  type: AUTH_GET_USER_SUCCESS,
  payload
});

const getUserFailure = (payload: any) => ({
  type: AUTH_GET_USER_FAILURE,
  payload
});

// Reducers
const reducer = (state = {}, action: any) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, payload: action.payload };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, payload: action.payload, isAuthenticated: true, needLogin: false };
    case AUTH_LOGIN_FAILURE:
      return { ...state, payload: action.payload, isAuthenticated: false, needLogin: true };

    case AUTH_LOGOUT_REQUEST:
      return { ...state };
    case AUTH_LOGOUT_SUCCESS:
      return { ...state, payload: action.payload, isAuthenticated: false, needLogin: true };
    case AUTH_LOGOUT_FAILURE:
      return { ...state, payload: action.payload, isAuthenticated: false, needLogin: true };

    case AUTH_GET_USER_REQUEST:
      return { ...state };
    case AUTH_GET_USER_SUCCESS:
      return { ...state, payload: action.payload, isAuthenticated: true, needLogin: false };
    case AUTH_GET_USER_FAILURE:
      return { ...state, payload: action.payload, isAuthenticated: false, needLogin: true };

    default:
      return state;
  }
};

export default reducer;
