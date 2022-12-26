import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT
} from '../actions/burgerConstructor';

const initialState = {
  ingredients: [
    {
      uuid: 'placeholder_bun',
      type: "bun",
      isLocked: true,
      name: "Перенесите сюда булочку",
      price: 0,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    },
    {
      uuid: 'placeholder_ingredient',
      name: "Перенесите сюда ингредиенты",
      price: 0,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    },
  ],
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload.ingredient]
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(item => item.uuid !== action.payload.uuid)
      }
    case ADD_BUN:
      // state.ingredients.splice(0, 1, action.ingredient);
      const copyAr = state.ingredients.slice(0);
      copyAr[0] = action.payload.ingredient;
      return {
        ...state,
        ingredients: copyAr
      }
    case MOVE_INGREDIENT: {
        const copyAr = state.ingredients.slice(0);
        const itemIndex = copyAr.findIndex(item => item.uuid === action.payload.itemUuid);
        const item = copyAr.splice(itemIndex, 1)[0];
        const pasteAfterIndex = copyAr.findIndex(item => item.uuid === action.payload.pasteAfterItemUuid);
        copyAr.splice(pasteAfterIndex + 1, 0, item);
      return {
        ...state,
        ingredients: copyAr
      }
    }
    default:
      return state
  }
}
