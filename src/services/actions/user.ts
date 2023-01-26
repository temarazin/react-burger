import api from "../../utils/api";
import { AppDispatch, AppThunk, TUser } from "../../utils/types";
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  refreshToken,
} from "../../utils/utils";
import {
  START_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from "../constants/actions";

export interface IStartRequestAction {
  readonly type: typeof START_REQUEST;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
}

export interface IRegisterUserFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface ILogoutAction {
  readonly type: typeof LOGOUT;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TUserActions =
  | IStartRequestAction
  | IRegisterUserSuccessAction
  | IRegisterUserFailedAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | ILogoutAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction;

export const registerUser:AppThunk = (email: string, password: string, name: string) => {
  return function (dispatch:AppDispatch) {
    dispatch({ type: START_REQUEST });
    api
      .registerUser(email, password, name)
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

export const login:AppThunk = (email: string, password: string) => {
  return function (dispatch:AppDispatch) {
    dispatch({ type: START_REQUEST });
    api
      .login(email, password)
      .then((res) => {
        if (res && res.success) {
          let { user, accessToken, refreshToken } = res;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          dispatch({
            type: LOGIN_SUCCESS,
            user,
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

export const logout:AppThunk = () => {
  return function (dispatch:AppDispatch) {
    api
      .logout(getRefreshToken() || '')
      .then((res) => {
        if (res.success) {
          removeRefreshToken();
          removeAccessToken();
          dispatch({
            type: LOGOUT,
          });
        }
      })
      .catch((e) => console.log(e.message));
  };
}

export const getUser:AppThunk = () => {
  return async function (dispatch:AppDispatch) {
    dispatch({ type: START_REQUEST });
    let aToken = getAccessToken();
    let rToken = getRefreshToken();
    let isTokenRefreshed = false;
    if (!aToken && !rToken) {
      dispatch({ type: GET_USER_FAILED });
      return;
    }
    if (!aToken) {
      try {
        await refreshToken();
        aToken = getAccessToken();
        isTokenRefreshed = true;
      } catch (e) {
        console.log(e);
        dispatch({ type: GET_USER_FAILED });
        return;
      }
    }

    let userResponse;
    try {
      if (aToken === undefined)
        return;
      userResponse = await api.getUser(aToken);
      if (!userResponse?.success && !isTokenRefreshed) {
        await refreshToken();
        aToken = getAccessToken();
        if (aToken === undefined)
          return;
        userResponse = await api.getUser(aToken);
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: GET_USER_FAILED });
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

export const updateUser:AppThunk = (email: string, name: string, password: string) => {
  return async function (dispatch:AppDispatch) {
    dispatch({ type: START_REQUEST });
    let aToken = getAccessToken();
    let rToken = getRefreshToken();
    let isTokenRefreshed = false;
    if (!aToken && !rToken) {
      dispatch({ type: UPDATE_USER_FAILED });
      return;
    }
    if (!aToken) {
      try {
        await refreshToken();
        aToken = getAccessToken();
        isTokenRefreshed = true;
      } catch (e) {
        console.log(e);
        dispatch({ type: UPDATE_USER_FAILED });
        return;
      }
    }

    let userResponse;
    let userData = {
      email,
      name,
      password,
    };
    try {
      if (aToken === undefined)
        return;
      userResponse = await api.updateUser(aToken, userData);
      if (!userResponse?.success && !isTokenRefreshed) {
        await refreshToken();
        aToken = getAccessToken();
        if (aToken === undefined)
          return;
        userResponse = await api.updateUser(aToken, userData);
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: UPDATE_USER_FAILED });
    }

    if (userResponse?.success) {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: userResponse.user,
      });
    } else {
      dispatch({
        type: UPDATE_USER_FAILED,
      });
    }
  };
}
