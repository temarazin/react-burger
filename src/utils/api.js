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

  getIngredients() {
    return fetch(this._baseUrl, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    }).catch(e => console.log(e));
  }
}

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api/ingredients",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
