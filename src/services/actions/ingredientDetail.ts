import { SET_CURRENT_INGREDIENT, UNSET_CURRENT_INGREDIENT } from "../constants/actions";
import { TIngredient } from "../../utils/types";

export interface ISetCurrentIngredientAction {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly payload: {
    ingredient: TIngredient;
  }
}

export interface IUnsetCurrentIngredientAction {
  readonly type: typeof UNSET_CURRENT_INGREDIENT;
}

export type TCurrentIngredientActions =
  | ISetCurrentIngredientAction
  | IUnsetCurrentIngredientAction;

export const ingredientDetailActions = {
  setCurrentIngredient: (ingredient: TIngredient): ISetCurrentIngredientAction => ({
    type: SET_CURRENT_INGREDIENT,
    payload: {
      ingredient
    }
  }),
  unsetCurrentIngredient: (): IUnsetCurrentIngredientAction => ({
    type: UNSET_CURRENT_INGREDIENT
  }),
}
