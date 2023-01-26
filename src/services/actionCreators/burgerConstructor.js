import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT,
} from "../actions/burgerConstructor";

export const burgerConstructorActions = {
  addIngredient: (ingredient) => ({
    type: ADD_INGREDIENT,
    payload: {
      ingredient
    }
  }),
  removeIngredient: (uuid) => ({
    type: REMOVE_INGREDIENT,
    payload: {
      uuid
    }
  }),
  addBun: (ingredient) => ({
    type: ADD_BUN,
    payload: {
      ingredient
    }
  }),
  moveIngredient: (itemUuid, pasteAfterItemUuid) => ({
    type: MOVE_INGREDIENT,
    payload: {
      itemUuid,
      pasteAfterItemUuid
    }
  })
};
