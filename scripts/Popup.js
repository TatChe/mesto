export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open () {
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
  }

  // закрытие попапа клавишей Esc
  _handleEscClose (event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // добавление слушателей клика иконке закрытия попапа и оверлею
  setEventListeners () {

  }
}