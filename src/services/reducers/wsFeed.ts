import { TOrderFull } from "../../utils/types";
import { TWsFeedActions } from "../actions/wsFeed";
import { WS_FEED_CONNECTION_SUCCESS, WS_FEED_CONNECTION_ERROR, WS_FEED_CONNECTION_CLOSED, WS_FEED_GET_MESSAGE, WS_FEED_CLOSE_CONNECTON } from "../constants/wsActionTypes";

type TWsFeedState = {
  wsConnected: boolean;
  error: Event | undefined;
  orders: TOrderFull[];
  total: number;
  totalToday: number;
}

const initialState: TWsFeedState = {
  wsConnected: false,
  error: undefined,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsFeedReducer = (state = initialState, action: TWsFeedActions): TWsFeedState => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_FEED_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        ...JSON.parse(action.payload)
      };
    case WS_FEED_CLOSE_CONNECTON:
      return initialState;
    default:
      return state;
  }
}
