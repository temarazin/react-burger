import { userReducer as reducer, initialState } from "./user";
import * as types from "../constants/actions";
import { testUser } from "../../utils/testData";

describe("User reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle START_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.START_REQUEST,
      })
    ).toEqual({
      ...initialState,
      request: true,
      requestFailed: false
    });
  });

  it("should handle REGISTER_USER_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.REGISTER_USER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      request: false,
      requestFailed: false,
      isSuccessRegister: true,
    });
  });

  it("should handle REGISTER_USER_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.REGISTER_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      request: false,
      requestFailed: true,
      isSuccessRegister: false,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_SUCCESS,
        user: testUser
      })
    ).toEqual({
      ...initialState,
      request: false,
      requestFailed: false,
      user: testUser,
      isAuth: true,
      authChecked: true,
    });
  });

  it("should handle LOGIN_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.LOGIN_FAILED,
      })
    ).toEqual({
      ...initialState,
      request: false,
      requestFailed: true,
    });
  });

  it("should handle LOGOUT", () => {
    expect(
      reducer(initialState, {
        type: types.LOGOUT,
      })
    ).toEqual({
      ...initialState,
      user: initialState.user,
      isAuth: false,
    });
  });

  it("should handle GET_USER_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.GET_USER_SUCCESS,
        user: testUser
      })
    ).toEqual({
      ...initialState,
      user: testUser,
      isAuth: true,
      authChecked: true,
      request: false,
      requestFailed: false
    });
  });

  it("should handle GET_USER_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.GET_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      user: initialState.user,
      isAuth: false,
      authChecked: true,
      request: false,
      requestFailed: true
    });
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.UPDATE_USER_SUCCESS,
        user: testUser
      })
    ).toEqual({
      ...initialState,
      user: testUser,
      request: false,
      requestFailed: false
    });
  });

  it("should handle UPDATE_USER_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.UPDATE_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      request: false,
      requestFailed: true
    });
  });
});
