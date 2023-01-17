import { TUser } from '../../utils/types';
import { TUserActions } from '../actions/user';
import {
  START_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from '../constants/actions';

type TUserState = {
  user: TUser,
  isAuth: boolean,
  authChecked: boolean,
  request: boolean,
  requestFailed: boolean,
  isSuccessRegister: boolean,
}

const initialState: TUserState = {
  user: {
    name: '',
    email: '',
  },
  isAuth: false,
  authChecked: false,
  request: false,
  requestFailed: false,
  isSuccessRegister: false,
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        request: true,
        requestFailed: false
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        request: false,
        requestFailed: false,
        isSuccessRegister: true,
      }
    case REGISTER_USER_FAILED:
      return {
        ...state,
        request: false,
        requestFailed: true,
        isSuccessRegister: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        request: false,
        requestFailed: false,
        user: action.user,
        isAuth: true,
        authChecked: true,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        request: false,
        requestFailed: true,
      }
    case LOGOUT:
      return {
        ...state,
        user: initialState.user,
        isAuth: false,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuth: true,
        authChecked: true,
        request: false,
        requestFailed: false
      }
    case GET_USER_FAILED:
      return {
        ...state,
        user: initialState.user,
        isAuth: false,
        authChecked: true,
        request: false,
        requestFailed: true
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        request: false,
        requestFailed: false
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        request: false,
        requestFailed: true
      }
    default:
      return state
  }
}
