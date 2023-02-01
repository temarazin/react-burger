import { ingredientDetailReducer as reducer, initialState } from "./ingredientDetail";
import * as types from '../constants/actions';
import { testIngredient } from "../../utils/testData";

describe("Ingredient detail reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_CURRENT_INGREDIENT', () => {
    expect(
      reducer(initialState, {
        type: types.SET_CURRENT_INGREDIENT,
        payload: {
          ingredient: testIngredient,
        }
      })
    ).toEqual({
      ...initialState,
      currentIngredient: testIngredient
    })
  });

  it('should handle UNSET_CURRENT_INGREDIENT', () => {
    expect(
      reducer(initialState, {
        type: types.UNSET_CURRENT_INGREDIENT,
      })
    ).toEqual({
      ...initialState,
      currentIngredient: null
    })
  });

})
