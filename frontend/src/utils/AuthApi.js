class AuthApi {
  constructor(baseUrl) {
    this._url = baseUrl;
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

  register({ email, password }) {
    return this._request(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  }

  login({ email, password }) {
    return this._request(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  }

  checkToken(token) {
    return this._request(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
  }
}

const authApi = new AuthApi("http://158.160.49.95:3001");
// const authApi = new AuthApi("http://localhost:3001");
export default authApi;

