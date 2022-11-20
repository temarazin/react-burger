import api from "../../utils/api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getOrder(ingredientIds) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    api.createOrder(ingredientIds)
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
