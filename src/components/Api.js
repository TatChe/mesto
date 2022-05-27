export default class Api {
  constructor ({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  // приватный метод для обработки ошибок
  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка при обращении к серверу, код ошибки: ${res.status}`);
  }


  // получить данные пользователя
  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._errorHandler(res));
  }

  // получить список всех карточек в виде массива
  getAllCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
    .then(res => this._errorHandler(res));
  }

  // получить необходимые стартовые данные (пользователь и карточки)
  getStartedData() {
    return Promise.all ([
      this.getUserData(),
      this.getAllCards()
    ]);
  }


  // заменить данные пользователя
  patchUserData(userData) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
    .then(res => this._errorHandler(res));
  }

  // заменить аватар
  patchUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    })
    .then(res => this._errorHandler(res));
  }

  // добавить карточку
  postCard(card) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'name': card.title,
        'link': card.link
      })
    })
    .then(res => this._errorHandler(res));
  }

  // удалить карточку
  deleteCard(card) {
    return fetch(this._baseUrl + '/cards/' + card.id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._errorHandler(res));
  }

  // поставить лайк карточке
  putCardLike(card) {
    return fetch(this._baseUrl + '/cards/' + card.id + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._errorHandler(res));
  }

  // удалить лайк карточки
  deleteCardLike(card) {
    return fetch(this._baseUrl + '/cards/' + card.id + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._errorHandler(res));
  }

}