class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // TODO: Выводить ошибки пользователю, а не в консоль.
  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    }).catch(e => console.log(e));
  }

  createOrder(ingredientIds) {
    return fetch(`${this._baseUrl}/orders`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        ingredients: ingredientIds
      })
    })
    .then((res) => {
      return this._checkResponse(res)
    })
    .catch(e => console.log(e))
  }

  resetPassword(email) {
    return fetch(`${this._baseUrl}/password-reset`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        email
      })
    })
    .then((res) => {
      return this._checkResponse(res)
    })
    .catch(e => console.log(e))
  }

  setNewPassword(password, token) {
    return fetch(`${this._baseUrl}/password-reset`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        password,
        token
      })
    })
    .then((res) => {
      return this._checkResponse(res)
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
