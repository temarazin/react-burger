import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  MOVE_INGREDIENT
} from '../constants/actions';
import { TBurgerConstructorActions } from '../actions/burgerConstructor';

import { TIngredient } from '../../utils/types';

type TStateIngredient = TIngredient & {
  isLocked?: boolean;
}

type TBurgerConstructorState = {
  ingredients: ReadonlyArray<TStateIngredient>
}

const placeholderIngredient: TStateIngredient = {
  _id: 'n/a',
  name: 'n/a',
  type: 'n/a',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  image: 'n/a',
  image_mobile: 'n/a',
  image_large: 'n/a',
  price: 0,
  __v: 0,
}

const placeholderBun: TStateIngredient = {
  ...placeholderIngredient,
  uuid: 'placeholder_bun',
  type: "bun",
  isLocked: true,
  name: "Перенесите сюда булочку",
  image: 'https://code.s3.yandex.net/react/code/bun-02.png'
};

const placeholderMain: TStateIngredient = {
  ...placeholderIngredient,
  uuid: 'placeholder_ingredient',
  name: "Перенесите сюда ингредиенты",
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
};

const initialState:TBurgerConstructorState = {
  ingredients: [
    placeholderBun,
    placeholderMain,
  ],
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
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
