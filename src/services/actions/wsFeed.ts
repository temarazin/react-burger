import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
  WS_FEED_CLOSE_CONNECTON,
} from "../constants/wsActionTypes";

export interface IWsConnectionStartAction {
  readonly type: typeof WS_FEED_CONNECTION_START;
  payload: string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
  payload: Event;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  payload: any;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_FEED_SEND_MESSAGE;
  payload: any;
}

export interface IWsCloseConnectionAction {
  readonly type: typeof WS_FEED_CLOSE_CONNECTON;
}

export type TWsFeedActions =
  | IWsConnectionStartAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetMessageAction
  | IWsSendMessageAction
  | IWsCloseConnectionAction;

export const wsFeedConnect = (url: string): IWsConnectionStartAction => ({
  type: WS_FEED_CONNECTION_START,
  payload: url,
});

export const wsFeedSendMessage = (data: any): IWsSendMessageAction => ({
  type: WS_FEED_SEND_MESSAGE,
  payload: data,
});

export const wsFeedConnectionSuccess = (): IWsConnectionSuccessAction => ({
  type: WS_FEED_CONNECTION_SUCCESS,
});

export const wsFeedConnectionError = (event: Event):IWsConnectionErrorAction => ({
  type: WS_FEED_CONNECTION_ERROR,
  payload: event
});

export const wsFeedConnectionClosed = ():IWsConnectionClosedAction => ({
  type: WS_FEED_CONNECTION_CLOSED
});

export const wsFeedGetMessage = (data: any):IWsGetMessageAction => ({
  type: WS_FEED_GET_MESSAGE,
  payload: data
})

export const wsFeedCloseConnection = ():IWsCloseConnectionAction => ({
  type: WS_FEED_CLOSE_CONNECTON,
})

export const wsFeedActions = {
  wsConnect: wsFeedConnect,
  wsSendMessage: wsFeedSendMessage,
  wsClose: wsFeedCloseConnection,
  onOpen: wsFeedConnectionSuccess,
  onError: wsFeedConnectionError,
  onClose: wsFeedConnectionClosed,
  onMessage: wsFeedGetMessage,
}
