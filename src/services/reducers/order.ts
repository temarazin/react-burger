import { TOrder, TOrderFull } from "../../utils/types";
import { TOrderActions } from "../actions/order";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_BY_ID_FAILED,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
} from "../constants/actions";

type TOrderState = {
  request: boolean,
  requestFailed: boolean,
  order: TOrder,
  orderFull: TOrderFull | null
}

const initialState: TOrderState = {
  request: false,
  requestFailed: false,
  order: {
    name: '',
    order: {
      number: null
    }
  },
  orderFull: null
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        request: true
      }
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        order: action.order,
        request: false,
        requestFailed: false
      }
    case GET_ORDER_FAILED:
      return {
        ...state,
        request: false,
        requestFailed: true,
      }
    case GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        request: true,
        orderFull: null,
      }
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        orderFull: action.order,
        request: false,
        requestFailed: false
      }
    case GET_ORDER_BY_ID_FAILED:
      return {
        ...state,
        request: false,
        requestFailed: true,
      }
    default:
      return state
  }
}
