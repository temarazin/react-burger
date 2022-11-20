import {
  SET_CURRENT_INGREDIENT,
} from "../actions/ingredientDetail";

const initialState = {
  currentIngredient: null
}

export const ingredientDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.ingredient
      }
    default:
      return state
  }
}
