import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { ingredientDetailReducer } from './ingredientDetail';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredientDetail: ingredientDetailReducer,
  user: userReducer
});
