import { burgerConstructorReducer as reducer, initialState } from "./burgerConstructor";
import * as types from '../constants/actions';

import { testIngredient, testIngredient2 } from "../../utils/testData";

describe("Burger constructor reducer", () => {
  it("Should return initial state by default", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_INGREDIENT,
        payload: {
          ingredient: testIngredient,
        }
      })
    ).toEqual({
      ...initialState,
      ingredients: [...initialState.ingredients, testIngredient]
    })
  });

  it('should handle REMOVE_INGREDIENT', () => {
    expect(
      reducer({...initialState, ingredients: [testIngredient, testIngredient2]}, {
        type: types.REMOVE_INGREDIENT,
        payload: {
          uuid: 'testuuid',
        }
      })
    ).toEqual({
      ...initialState,
      ingredients: [testIngredient]
    })
  });

  it('should handle ADD_BUN', () => {
    expect(
      reducer({...initialState, ingredients: [testIngredient, testIngredient2]}, {
        type: types.ADD_BUN,
        payload: {
          ingredient: testIngredient2,
        }
      })
    ).toEqual({
      ...initialState,
      ingredients: [testIngredient2, testIngredient2]
    })
  });

  it('should handle MOVE_INGREDIENT', () => {
    expect(
      reducer({...initialState, ingredients: [{...testIngredient, uuid: 'test'}, testIngredient, testIngredient2, testIngredient]}, {
        type: types.MOVE_INGREDIENT,
        payload: {
          itemUuid: 'testuuid',
          pasteAfterItemUuid: 'test'
        }
      })
    ).toEqual({
      ...initialState,
      ingredients: [{...testIngredient, uuid: 'test'}, testIngredient2, testIngredient, testIngredient]
    })
  });
})
