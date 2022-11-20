import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  COUNT_TOTAL_PRICE,
} from '../actions/burgerConstructor';

const initialState = {
  ingredients: [
    {
      _id: 'placeholder_bun',
      type: "true",
      isLocked: true,
      name: "Перенесите сюда булочку",
      price: 0,
      qty: 1,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    },
    {
      _id: 'placeholder_ingredient',
      name: "Перенесите сюда ингредиенты",
      price: 0,
      qty: 1,
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
      const index = state.ingredients.findIndex(item => item._id === action.id)
      state.ingredients.splice(index, 1);
      return {
        ...state,
        ingredients: [...state.ingredients]
      }
    case ADD_BUN:
      state.ingredients.splice(0, 1, action.ingredient);
      return {
        ...state,
        ingredients: [...state.ingredients]
      }
    case COUNT_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: state.ingredients.reduce((sum, item) => {
          let price = item.price;
          if (item.type === 'bun') {
            price *= 2;
          }
          return sum += price;
        }, 0)
      }
    default:
      return state
  }
}
