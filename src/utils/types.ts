import * as H from "history";
import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { TBurgerConstructorActions } from "../services/actions/burgerConstructor";
import { TCurrentIngredientActions } from "../services/actions/ingredientDetail";
import { TIngredientsActions } from "../services/actions/ingredients";
import { TOrderActions } from "../services/actions/order";
import { TUserActions } from "../services/actions/user";
import { TWsFeedActions } from "../services/actions/wsFeed";
import { store } from "../services/store";
import { ingredientCategory } from "./enums";

export type TModalState = {
  background: H.Location
}

export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  image: string,
  image_mobile: string,
  image_large: string,
  price: number,
  __v: number,
  uuid?: string
}

export type TResponse = {
  success: boolean,
  message?: string
}

export type TUser = {
  name: string,
  email: string,
  password?: string
}

export type TIngredientCategory = {
  type: ingredientCategory,
  name: string
}

export type TOrder = {
  name: string,
  order: {
    number: number | null
  }
}

export type TOrderFull = {
  ingredients: string[],
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string
}

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TBurgerConstructorActions
  | TCurrentIngredientActions
  | TIngredientsActions
  | TOrderActions
  | TUserActions
  | TWsFeedActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;

export type TActionCreator = () => TApplicationActions

export type TActionCreatorWithPayload = (arg?: any) => TApplicationActions
