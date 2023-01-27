import api from "../../utils/api";
import { AppDispatch, AppThunk, TIngredient, TOrder, TOrderFull } from "../../utils/types";
import { getAccessToken } from "../../utils/utils";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, GET_ORDER_BY_ID_FAILED, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS } from "../constants/actions";

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderByIdRequestAction {
  readonly type: typeof GET_ORDER_BY_ID_REQUEST;
}

export interface IGetOrderByIdSuccessAction {
  readonly type: typeof GET_ORDER_BY_ID_SUCCESS;
  readonly order: TOrderFull;
}

export interface IGetOrderByIdFailedAction {
  readonly type: typeof GET_ORDER_BY_ID_FAILED;
}

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IGetOrderByIdRequestAction
  | IGetOrderByIdSuccessAction
  | IGetOrderByIdFailedAction;

export const getOrder:AppThunk = (ingredientIds:Array<Pick<TIngredient, '_id'>>) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    const token = getAccessToken() || '';
    api.createOrder(ingredientIds, token)
      .then((res) => {
        if (res && res.success) {
          const {name, order} = res
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: { name, order },
          });
        } else {
          dispatch({
            type: GET_ORDER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}

export const getOrderById:AppThunk = (orderNumber: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    api.getOrder(orderNumber)
      .then((res) => {
        if (res && res.success) {
          const { orders } = res
          dispatch({
            type: GET_ORDER_BY_ID_SUCCESS,
            order: orders[0],
          });
        } else {
          dispatch({
            type: GET_ORDER_BY_ID_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_BY_ID_FAILED,
        });
      });
  }
}
