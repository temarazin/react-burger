import api from "../../utils/api";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  refreshToken
} from '../../utils/utils';

export const START_REQUEST = "START_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const LOGOUT = "LOGOUT";

export function registerUser(email, password, name) {
  return function (dispatch) {
    dispatch({ type: START_REQUEST });
    api.registerUser(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_USER_SUCCESS,
          });
        } else {
          dispatch({
            type: REGISTER_USER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER_USER_FAILED,
        });
      });
  };
}

export function login(email, password) {
  return function (dispatch) {
    dispatch({ type: START_REQUEST });
    api.login(email, password)
      .then((res) => {
        if (res && res.success) {
          let {user, accessToken, refreshToken} = res;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            user
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logout() {
  return function (dispatch) {
    api.logout(getRefreshToken())
      .then((res) => {
        if (res.success) {
          removeRefreshToken();
          removeAccessToken();
          dispatch({
            type: LOGOUT
          });
        }
      })
      .catch(e => console.log(e.message));
  }
}

export function getUser() {
  return async function (dispatch) {
    dispatch({ type: START_REQUEST });
    let aToken = getAccessToken();
    let rToken = getRefreshToken();
    let isTokenRefreshed = false;
    if (!aToken && !rToken) {
      dispatch({type: GET_USER_FAILED});
      return;
    }
    if (!aToken) {
      try {
        console.log('test');
        await refreshToken();
        aToken = getAccessToken();
        isTokenRefreshed = true;
      } catch(e) {
        console.log(e);
        dispatch({type: GET_USER_FAILED});
        return;
      }
    }

    let userResponse;
    try {
      userResponse = await api.getUser(aToken);
      if (!userResponse?.success && !isTokenRefreshed) {
        await refreshToken();
        aToken = getAccessToken();
        userResponse = await api.getUser(aToken);
      }
    } catch(e) {
      console.log(e);
      dispatch({type: GET_USER_FAILED});
    }

    if (userResponse?.success) {
      dispatch({
        type: GET_USER_SUCCESS,
        user: userResponse.user,
      });
    } else {
      dispatch({
        type: GET_USER_FAILED,
      });
    }
  };
}
