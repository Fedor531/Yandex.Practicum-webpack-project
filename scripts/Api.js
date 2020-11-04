class Api {
  constructor(config) {
    this.url = config.url
    this.headers = config.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  changeUserInfo(newName, newDescription) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription,
      })
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  postNewCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  addLike(id) {
    return fetch(`${this.url}/cards/like/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  deleteLike(id) {
    return fetch(`${this.url}/cards/like/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  changeAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(res => {
        return this._getResponseData(res)
      })
  }
}
