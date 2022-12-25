import { TIngredient, TResponse, TUser } from "./types";

type TRequest = {
  baseUrl: string,
  headers: HeadersInit
}

type TIngredientsResponse = TResponse & {
  data: TIngredient[]
}

type TOrderResponse = TResponse & {
  name: string,
  order: {
    number: number
  }
}

type TUserDataResponse = TResponse & {
  user: TUser
}

type TUserResponse = TResponse & TUserDataResponse & {
  accessToken: string;
  refreshToken: string;
}

type TRefreshTokenResponse = TResponse & {
  accessToken: string;
  refreshToken: string;
}

class Api {
  protected _baseUrl: string;
  protected _headers: HeadersInit;

  constructor({ baseUrl, headers }: TRequest) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse<T>(res:Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // TODO: Выводить ошибки пользователю, а не в консоль.
  async getIngredients() {
    try {
      const res = await fetch(`${this._baseUrl}/ingredients`, {
        headers: this._headers,
      });
      return await this._checkResponse<TIngredientsResponse>(res);
    } catch (e) {
      return console.log(e);
    }
  }

  async createOrder(ingredientIds: Array<Pick<TIngredient, "_id">>) {
    try {
      const res = await fetch(`${this._baseUrl}/orders`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          ingredients: ingredientIds
        })
      });
      return await this._checkResponse<TOrderResponse>(res);
    } catch (e) {
      return console.log(e);
    }
  }

  async resetPassword(email: string) {
    try {
      const res = await fetch(`${this._baseUrl}/password-reset`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          email
        })
      });
      return await this._checkResponse<TResponse>(res);
    } catch (e) {
      return console.log(e);
    }
  }

  async setNewPassword(password: string, token: string) {
    try {
      const res = await fetch(`${this._baseUrl}/password-reset`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          password,
          token
        })
      });
      return await this._checkResponse<TResponse>(res);
    } catch (e) {
      return console.log(e);
    }
  }

  async registerUser(email: string, password: string, name: string) {
    try {
      const res = await fetch(`${this._baseUrl}/auth/register`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name
        })
      });
      return await this._checkResponse<TUserResponse>(res);
    } catch (e) {
      return console.log(e);
    }
  }

  async login(email: string, password: string) {
    try {
      const res = await fetch(`${this._baseUrl}/auth/login`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        })
      });
      return await this._checkResponse<TUserResponse>(res);
    } catch (e) {
      return console.log(e);
    }
  }

  async logout(token: string) {
    try {
      const res = await fetch(`${this._baseUrl}/auth/logout`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({ token }),
      });
      return await this._checkResponse<TResponse>(res);
    } catch (e) {
      return console.log(e);
    }
  }

  async refreshToken(token: string) {
    try {
      const res = await fetch(`${this._baseUrl}/auth/token`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({ token }),
      });
      return await this._checkResponse<TRefreshTokenResponse>(res);
    } catch (e) {
      return console.log(e);
    }
  }

  getUser(token: string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        authorization: token,
      },
      method: 'GET',
    })
    .then((res) => {
      return this._checkResponse<TUserDataResponse>(res)
    })
    .catch(e => console.log(e))
  }

  updateUser(token: string, userData: TUser) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        authorization: token,
      },
      method: 'PATCH',
      body: JSON.stringify(userData),
    })
    .then((res) => {
      return this._checkResponse<TUserDataResponse>(res)
    })
    .catch(e => console.log(e))
  }
}

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
