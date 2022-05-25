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
  patchUserAvatar() {

  }


  // получить список всех карточек в виде массива
  getAllCards() {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
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
  deleteCard() {

  }

  // поставить лайк карточке (PUT)
  putCardLike() {

  }

  // удалить лайк карточки
  deleteCardLike() {
    
  }

}