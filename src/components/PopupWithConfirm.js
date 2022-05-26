import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor ( popupSelector ) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setSubmitAction ( handleFormSubmit ) {
    this._handleFormSubmit = handleFormSubmit.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.close();
      this._handleFormSubmit();
    });
  }
}