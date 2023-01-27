import { TIngredient, TOrderFull, TResponse, TUser } from "./types";

type TRequest = {
  baseUrl: string;
  headers: HeadersInit;
};

type TIngredientsResponse = TResponse & {
  data: TIngredient[];
};

type TOrderResponse = TResponse & {
  name: string;
  order: {
    number: number;
  };
};

type TUserDataResponse = TResponse & {
  user: TUser;
};

type TUserResponse = TResponse &
  TUserDataResponse & {
    accessToken: string;
    refreshToken: string;
  };

type TRefreshTokenResponse = TResponse & {
  accessToken: string;
  refreshToken: string;
};

type TOrderFullResponse = {
  success: boolean,
  orders: Array<TOrderFull>
}

class Api {
  protected _baseUrl: string;
  protected _headers: HeadersInit;

  constructor({ baseUrl, headers }: TRequest) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getIngredients() {
    const res = await fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers,
    });
    return await this._checkResponse<TIngredientsResponse>(res);
  }

  async createOrder(ingredientIds: Array<Pick<TIngredient, "_id">>, token: string) {
    const res = await fetch(`${this._baseUrl}/orders`, {
      headers: {
        ...this._headers,
        authorization: token,
      },
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredientIds,
      }),
    });
    return await this._checkResponse<TOrderResponse>(res);
  }

  async getOrder(orderNumber: number) {
    const res = await fetch(`${this._baseUrl}/orders/${orderNumber}`, {
      headers: this._headers,
    });
    return await this._checkResponse<TOrderFullResponse>(res);
  }

  async resetPassword(email: string) {
    const res = await fetch(`${this._baseUrl}/password-reset`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        email,
      }),
    });
    return await this._checkResponse<TResponse>(res);
  }

  async setNewPassword(password: string, token: string) {
    const res = await fetch(`${this._baseUrl}/password-reset/reset`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        password,
        token,
      }),
    });
    return await this._checkResponse<TResponse>(res);
  }

  async registerUser(email: string, password: string, name: string) {
    const res = await fetch(`${this._baseUrl}/auth/register`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    return await this._checkResponse<TUserResponse>(res);
  }

  async login(email: string, password: string) {
    const res = await fetch(`${this._baseUrl}/auth/login`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return await this._checkResponse<TUserResponse>(res);
  }

  async logout(token: string) {
    const res = await fetch(`${this._baseUrl}/auth/logout`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ token }),
    });
    return await this._checkResponse<TResponse>(res);
  }

  async refreshToken(token: string) {
    const res = await fetch(`${this._baseUrl}/auth/token`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ token }),
    });
    return await this._checkResponse<TRefreshTokenResponse>(res);
  }

  getUser(token: string) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        authorization: token,
      },
      method: "GET",
    }).then((res) => {
      return this._checkResponse<TUserDataResponse>(res);
    });
  }

  updateUser(token: string, userData: TUser) {
    return fetch(`${this._baseUrl}/auth/user`, {
      headers: {
        ...this._headers,
        authorization: token,
      },
      method: "PATCH",
      body: JSON.stringify(userData),
    }).then((res) => {
      return this._checkResponse<TUserDataResponse>(res);
    });
  }
}

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
