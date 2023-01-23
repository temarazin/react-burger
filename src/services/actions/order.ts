import api from "../../utils/api";
import { AppDispatch, AppThunk, TIngredient, TOrder } from "../../utils/types";
import { getAccessToken } from "../../utils/utils";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../constants/actions";

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

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

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
