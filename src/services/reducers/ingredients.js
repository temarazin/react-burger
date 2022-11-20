import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_CURRENT_INGREDIENT,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  request: false,
  requestFailed: false,
  currentIngredient: null
}

export const ingredientsReducer = (state = initialState, action) => {
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
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.ingredient
      }
    default:
      return state
  }
}
