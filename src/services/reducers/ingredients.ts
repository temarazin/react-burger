import { TIngredient } from "../../utils/types";
import { TIngredientsActions } from "../actions/ingredients";
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../constants/actions";

type TIngredientsState = {
  ingredients: TIngredient[],
  request: boolean,
  requestFailed: boolean,
}

const initialState: TIngredientsState = {
  ingredients: [],
  request: false,
  requestFailed: false,
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        request: true
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        request: false,
        requestFailed: false
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        request: false,
        requestFailed: true,
      }
    default:
      return state
  }
}
