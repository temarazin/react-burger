import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { wsFeedActions } from './actions/wsFeed';
import { socketMiddleware } from './middlewares/socketMiddleware';
import { wsProfileOrdersActions } from './actions/wsProfileOrders';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsFeed = socketMiddleware(wsFeedActions);
const wsProfileOrders = socketMiddleware(wsProfileOrdersActions);

const enhancer = composeEnhancers(applyMiddleware(thunk, wsFeed, wsProfileOrders));

export const store = createStore(rootReducer, enhancer);
