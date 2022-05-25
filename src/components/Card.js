export default class Card {
  constructor ( { data, handleCardClick }, cardTemplate) {
    this._title = data.title;
    this._link = data.link;
    this._cardTemplate = cardTemplate;

    // функция обработки клика по картинке, описана в index.js
    this._handleCardClick = handleCardClick;
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
      this._toggleLike();
    });

    this._element.querySelector('.element__button-delete').addEventListener('click', () => {
      this._deleteCard();
    });

    /* т.к. в файл класса мы не должны ничего импортировать из других файлов,
    для обработки клика по картинке будем использовать мягкое связывание */
    this._img.addEventListener('click', () => {
      this._handleCardClick(this._title, this._link);
    });
  }  

  // установка и снятие like
  _toggleLike() {
    this._element.querySelector('.element__button-like').classList.toggle('element__button-like_active');
  }

  // удаление карточки
  _deleteCard() {
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
    this._img.alt = this._title;
    this._img.src = this._link;

    return this._element;
  }  
}