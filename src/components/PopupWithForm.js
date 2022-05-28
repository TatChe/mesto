import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor ( popupSelector, handleFormSubmit ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this.form = this._popup.querySelector('.popup__form');
  }

  // сбор данных всех полей формы
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this.form.reset();
  }

  renderLoading(isLoading = false) {
    const submitButton = this._popup.querySelector('.popup__button-submit');

    if ( isLoading ) {
      submitButton.textContent = 'Сохранение ...';
    } else {
      submitButton.textContent = 'Сохранить';
    }
  }
}