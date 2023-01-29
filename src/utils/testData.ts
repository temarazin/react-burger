import { TIngredient, TOrder, TOrderFull, TResponse, TUser } from "./types";

export const testIngredient: TIngredient = {
  _id: 'test ingredient',
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

export const testIngredient2:TIngredient = {
  _id: 'test ingredient with uuid',
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
  uuid: 'testuuid'
}

export const testOrder:TOrder = {
  name: 'test order',
  order: {
    number: 123
  }
}

export const testFullOrder:TOrderFull = {
  ingredients: ['1', '2'],
  _id: 'test_id',
  status: 'some status',
  number: 124,
  createdAt: '2020-05-12T23:50:21.817Z',
  updatedAt: '2020-05-12T23:50:21.817Z',
  name: 'Test full order',
}

export const testUser:TUser = {
  name: 'test user',
  email: 'test@mail.ru',
  password: 'pass'
}

export const feedData = {
  orders: [testFullOrder],
  total: 12,
  totalToday: 2,
}
