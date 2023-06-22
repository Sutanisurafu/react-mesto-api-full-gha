class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _request(baseUrl, headers) {
    return fetch(baseUrl, headers).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
  }

  editUserInfo(data) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  editAvatar(userAvatar) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar,
      }),
    });
  }

  addCard(cardData) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  addLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    isLiked ? this.deleteLike(cardId) : this.addLike(cardId);
  }

  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }


}

const api = new Api({
  baseUrl: "http://158.160.49.95:3001",
 //baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default api;
