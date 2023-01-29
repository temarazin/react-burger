import { TIngredient } from "../../utils/types";
import { TCurrentIngredientActions } from "../actions/ingredientDetail";
import {
  SET_CURRENT_INGREDIENT,
  UNSET_CURRENT_INGREDIENT
} from "../constants/actions";

type TIngredientDetailState = {
  currentIngredient: TIngredient | null;
}

export const initialState: TIngredientDetailState = {
  currentIngredient: null
}

export const ingredientDetailReducer = (state = initialState, action: TCurrentIngredientActions): TIngredientDetailState => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload.ingredient
      }
    case UNSET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: null
      }
    default:
      return state
  }
}
