import { ADD_INGREDIENT, REMOVE_INGREDIENT, ADD_BUN, MOVE_INGREDIENT } from '../constants/actions';
import { TIngredient } from '../../utils/types';

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: {
    ingredient: TIngredient;
  }
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly payload: {
    uuid: string;
  }
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly payload: {
    ingredient: TIngredient;
  }
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: {
    itemUuid: string;
    pasteAfterItemUuid: string
  }
}

export type TBurgerConstructorActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IAddBunAction
  | IMoveIngredientAction;

export const burgerConstructorActions = {
  addIngredient: (ingredient: TIngredient): IAddIngredientAction => ({
    type: ADD_INGREDIENT,
    payload: {
      ingredient
    }
  }),
  removeIngredient: (uuid: string): IRemoveIngredientAction => ({
    type: REMOVE_INGREDIENT,
    payload: {
      uuid
    }
  }),
  addBun: (ingredient: TIngredient): IAddBunAction => ({
    type: ADD_BUN,
    payload: {
      ingredient
    }
  }),
  moveIngredient: (itemUuid: string, pasteAfterItemUuid: string): IMoveIngredientAction => ({
    type: MOVE_INGREDIENT,
    payload: {
      itemUuid,
      pasteAfterItemUuid
    }
  })
};
