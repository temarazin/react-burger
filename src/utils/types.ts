import * as H from "history";
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
