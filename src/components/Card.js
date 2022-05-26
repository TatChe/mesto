export default class Card {
  constructor ( { data, handleCardClick, handleDeleteClick }, cardTemplate, currentUserID) {
    this._title = data.title;
    this._link = data.link;
    this._likes = data.likes;
    this._likesCounter = data.likesCounter;
    this._cardTemplate = cardTemplate;
    this.id = data.id;
    this._ownerID = data.owner;
    this._currentUserID = currentUserID;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  // возвращение разметки
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.element')
      .cloneNode(true);
    
    // убираем кнопку удаления для чужих карточек
    if ( this._ownerID != this._currentUserID ) {
      cardElement.querySelector('.element__button-delete').remove();
    }

    // возвращаем DOM-элемент карточки
    return cardElement;
  }

  // установка слушателей
  _setEventListeners() {
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._toggleLike();
    });

    // проверяем наличие кнопки удаления
    const deleteButton = this._element.querySelector('.element__button-delete');
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        this._handleDeleteClick();
      });
    }

    this._img.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }  

  // установка и снятие like
  _toggleLike() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  // удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = '';
  }


  // публичный метод, возвращает работоспособный и наполненный данными элемент карточки
  generateCard() {
    // DOM-элемент карточки
    this._element = this._getTemplate();
    // картинка карточки
    this._img = this._element.querySelector('.element__img');

    this._setEventListeners();
  
    // добавим данные
    this._element.querySelector('.element__name').textContent = this._title;
    this._element.querySelector('.element__likes-counter').textContent = this._likesCounter;
    this._img.alt = this._title;
    this._img.src = this._link;

    return this._element;
  }  
}