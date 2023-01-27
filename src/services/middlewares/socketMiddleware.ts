import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TActionCreator, TActionCreatorWithPayload } from "../../utils/types";

interface IWsActions {
  wsConnect: TActionCreatorWithPayload;
  wsSendMessage: TActionCreatorWithPayload;
  wsClose: TActionCreator;
  onOpen: TActionCreator;
  onError: TActionCreatorWithPayload;
  onClose: TActionCreatorWithPayload;
  onMessage: TActionCreatorWithPayload;
}

export const socketMiddleware = (wsActions: IWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsConnect, wsSendMessage, wsClose, onOpen, onError, onClose, onMessage } = wsActions;

      if (type === wsConnect(action.payload).type) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch(onOpen());
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch(onError(event));
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch(onMessage(data));
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch(onClose(event));
        };

        if (type === wsSendMessage().type) {
          const message = action.payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }

        if (type === wsClose().type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  });
};
