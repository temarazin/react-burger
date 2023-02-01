import { TOrderFull } from "../../utils/types";
import { TWsProfileOrdersActions } from "../actions/wsProfileOrders";
import { WS_PROFILE_ORDERS_CONNECTION_SUCCESS, WS_PROFILE_ORDERS_CONNECTION_ERROR, WS_PROFILE_ORDERS_CONNECTION_CLOSED, WS_PROFILE_ORDERS_GET_MESSAGE, WS_PROFILE_ORDERS_CLOSE_CONNECTON } from "../constants/wsActionTypes";

type TWsProfileOrdersState = {
  wsConnected: boolean;
  error: Event | undefined;
  orders: TOrderFull[];
  total: number;
  totalToday: number;
}

export const initialState: TWsProfileOrdersState = {
  wsConnected: false,
  error: undefined,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsProfileOrdersReducer = (state = initialState, action: TWsProfileOrdersActions): TWsProfileOrdersState => {
  switch (action.type) {
    case WS_PROFILE_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_PROFILE_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_PROFILE_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_PROFILE_ORDERS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        ...JSON.parse(action.payload)
      };
    case WS_PROFILE_ORDERS_CLOSE_CONNECTON:
      return initialState;
    default:
      return state;
  }
}
