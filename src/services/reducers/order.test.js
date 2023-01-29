import { orderReducer as reducer, initialState } from "./order";
import * as types from "../constants/actions";
import { testFullOrder, testOrder } from "../../utils/testData";

describe("Order reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_ORDER_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("should handle GET_ORDER_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_SUCCESS,
        order: testOrder
      })
    ).toEqual({
      ...initialState,
      order: testOrder,
      request: false,
      requestFailed: false
    });
  });

  it("should handle GET_ORDER_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      request: false,
      requestFailed: true,
    });
  });

  it("should handle GET_ORDER_BY_ID_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_BY_ID_REQUEST,
      })
    ).toEqual({
      ...initialState,
      request: true,
      orderFull: null,
    });
  });

  it("should handle GET_ORDER_BY_ID_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_BY_ID_SUCCESS,
        order: testFullOrder
      })
    ).toEqual({
      ...initialState,
      orderFull: testFullOrder,
      request: false,
      requestFailed: false
    });
  });

  it("should handle GET_ORDER_BY_ID_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.GET_ORDER_BY_ID_FAILED,
        order: testFullOrder
      })
    ).toEqual({
      ...initialState,
      request: false,
      requestFailed: true,
    });
  });
});
