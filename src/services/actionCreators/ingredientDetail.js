import { SET_CURRENT_INGREDIENT, UNSET_CURRENT_INGREDIENT } from '../actions/ingredientDetail';

export const ingredientDetailActions = {
  setCurrentIngredient: (ingredient) => ({
    type: SET_CURRENT_INGREDIENT,
    payload: {
      ingredient
    }
  }),
  unsetCurrentIngredient: () => ({
    type: UNSET_CURRENT_INGREDIENT
  }),
}
