import {
  WS_PROFILE_ORDERS_CONNECTION_START,
  WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
  WS_PROFILE_ORDERS_CONNECTION_ERROR,
  WS_PROFILE_ORDERS_CONNECTION_CLOSED,
  WS_PROFILE_ORDERS_GET_MESSAGE,
  WS_PROFILE_ORDERS_SEND_MESSAGE,
  WS_PROFILE_ORDERS_CLOSE_CONNECTON,
} from "../constants/wsActionTypes";

export interface IWsConnectionStartAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_START;
  payload: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_ERROR;
  payload: Event;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_PROFILE_ORDERS_GET_MESSAGE;
  payload: any;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_PROFILE_ORDERS_SEND_MESSAGE;
  payload: any;
}

export interface IWsCloseConnectionAction {
  readonly type: typeof WS_PROFILE_ORDERS_CLOSE_CONNECTON;
}

export type TWsProfileOrdersActions =
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetMessageAction
  | IWsSendMessageAction
  | IWsCloseConnectionAction;

export const wsProfileOrdersConnect = (url: string): IWsConnectionStartAction => ({
  type: WS_PROFILE_ORDERS_CONNECTION_START,
  payload: url,
});

export const wsProfileOrdersSendMessage = (data: any): IWsSendMessageAction => ({
  type: WS_PROFILE_ORDERS_SEND_MESSAGE,
  payload: data,
});

export const wsProfileOrdersConnectionSuccess = (): IWsConnectionSuccessAction => ({
  type: WS_PROFILE_ORDERS_CONNECTION_SUCCESS,
});

export const wsProfileOrdersConnectionError = (event: Event):IWsConnectionErrorAction => ({
  type: WS_PROFILE_ORDERS_CONNECTION_ERROR,
  payload: event
});

export const wsProfileOrdersConnectionClosed = ():IWsConnectionClosedAction => ({
  type: WS_PROFILE_ORDERS_CONNECTION_CLOSED
});

export const wsProfileOrdersGetMessage = (data: any):IWsGetMessageAction => ({
  type: WS_PROFILE_ORDERS_GET_MESSAGE,
  payload: data
})

export const wsProfileOrdersCloseConnection = ():IWsCloseConnectionAction => ({
  type: WS_PROFILE_ORDERS_CLOSE_CONNECTON,
})

export const wsProfileOrdersActions = {
  wsConnect: wsProfileOrdersConnect,
  wsSendMessage: wsProfileOrdersSendMessage,
  wsClose: wsProfileOrdersCloseConnection,
  onOpen: wsProfileOrdersConnectionSuccess,
  onError: wsProfileOrdersConnectionError,
  onClose: wsProfileOrdersConnectionClosed,
  onMessage: wsProfileOrdersGetMessage,
}
