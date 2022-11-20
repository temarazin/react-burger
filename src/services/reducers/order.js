import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/order";

const initialState = {
  request: false,
  requestFailed: false,
  order: {
    name: '',
    order: {
      number: null
    }
  }
}

export const orderReducer = (state = initialState, action) => {
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
    default:
      return state
  }
}
