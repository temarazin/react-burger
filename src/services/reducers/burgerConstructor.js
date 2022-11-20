import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
} from '../actions/burgerConstructor';

const initialState = {
  ingredients: [
    {
      _id: 'placeholder_bun',
      type: "true",
      isLocked: true,
      name: "Перенесите сюда булочку",
      price: 0,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    },
    {
      _id: 'placeholder_ingredient',
      name: "Перенесите сюда ингредиенты",
      price: 0,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    },
  ],
  totalPrice: 0,
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient]
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(item => item._id !== action.id)
      }
    case ADD_BUN:
      return {
        ...state,
        ingredient: [...state.ingredients.splice(0, 1, action.ingredient)]
      }
    default:
      return state
  }
}
