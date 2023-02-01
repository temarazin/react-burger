import { ingredientsReducer as reducer, initialState } from "./ingredients";
import * as types from "../constants/actions";
import { testIngredient, testIngredient2 } from "../../utils/testData";

describe("Ingredient reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      request: true,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_SUCCESS,
        ingredients: [testIngredient, testIngredient2],
      })
    ).toEqual({
      ...initialState,
      ingredients: [testIngredient, testIngredient2],
      request: false,
      requestFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      reducer(initialState, {
        type: types.GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      request: false,
      requestFailed: true,
    });
  });
});
