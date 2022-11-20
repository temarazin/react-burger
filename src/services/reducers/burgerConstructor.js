import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/burgerConstructor';

const initialState = {
  ingredients: [],
  price: 0,
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
      }
    default:
      return state
  }
}
