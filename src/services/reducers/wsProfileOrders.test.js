import { wsProfileOrdersReducer as reducer, initialState } from "./wsProfileOrders";
import * as types from '../constants/wsActionTypes';
import { feedData, testFullOrder } from "../../utils/testData";

describe("Web socket profile orders reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle WS_PROFILE_ORDERS_CONNECTION_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: types.WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true
    })
  });

  it('should handle WS_PROFILE_ORDERS_CONNECTION_ERROR', () => {
    expect(
      reducer(initialState, {
        type: types.WS_PROFILE_ORDERS_CONNECTION_ERROR,
        payload: 'some error'
      })
    ).toEqual({
      ...initialState,
      error: 'some error',
      wsConnected: false
    })
  });

  it('should handle WS_PROFILE_ORDERS_CONNECTION_CLOSED', () => {
    expect(
      reducer({...initialState, wsConnected: true}, {
        type: types.WS_PROFILE_ORDERS_CONNECTION_CLOSED,
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false
    })
  });

  it('should handle WS_PROFILE_ORDERS_GET_MESSAGE', () => {
    expect(
      reducer(initialState, {
        type: types.WS_PROFILE_ORDERS_GET_MESSAGE,
        payload: JSON.stringify(feedData)
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      ...feedData
    })
  });

  it('should handle WS_PROFILE_ORDERS_CLOSE_CONNECTON', () => {
    expect(
      reducer({
        wsConnected: true,
        error: undefined,
        orders: [testFullOrder],
        total: 12,
        totalToday: 2,
      }, {
        type: types.WS_PROFILE_ORDERS_CLOSE_CONNECTON,
      })
    ).toEqual(initialState)
  });

})
