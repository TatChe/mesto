export default class Card {
  constructor ( { data, handleCardClick, handleDeleteClick, handleLikeClick }, cardTemplate, currentUserID) {
    this._title = data.title;
    this._link = data.link;
    this.likes = data.likes;
    this._cardTemplate = cardTemplate;
    this.id = data.id;
    this._ownerID = data.owner;
    this._currentUserID = currentUserID;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  // возвращение разметки
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.element')
      .cloneNode(true);

    // возвращаем DOM-элемент карточки
    return cardElement;
  }

  // установка слушателей
  _setEventListeners() {
    this._element.querySelector('.element__button-like').addEventListener('click', () => {
      this._handleLikeClick(this);
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

  // удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }


  // лайки карточки
  isLiked() {
    return Boolean(this.likes.find(like => like._id === this._currentUserID));
  }

  setLikes(data) {
    const likeIcon = this._element.querySelector('.element__button-like');
    const likesCounterPlace = this._element.querySelector('.element__likes-counter');
    this.likes = data.likes;
    likesCounterPlace.textContent = this.likes.length;

    if ( this.isLiked() ) {
      likeIcon.classList.add('element__button-like_active');
    } else {
      likeIcon.classList.remove('element__button-like_active');
    }
  }

  // возвращаем работоспособный и наполненный данными элемент карточки
  generateCard() {
    // DOM-элемент карточки
    this._element = this._getTemplate();
    // картинка
    this._img = this._element.querySelector('.element__img');

    this._setEventListeners();
  
    // добавим данные
    this._element.querySelector('.element__name').textContent = this._title;
    this._img.alt = this._title;
    this._img.src = this._link;
    this.setLikes(this);

    // убираем кнопку удаления для чужих карточек
    if ( this._ownerID != this._currentUserID ) {
      this._element.querySelector('.element__button-delete').remove();
    }

    return this._element;
  }
}