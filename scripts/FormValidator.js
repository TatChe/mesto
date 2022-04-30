export default class FormValidator {
  constructor(form, validationSettings) {
    this._form = form;
    this._inputSelector = validationSettings.inputSelector;
    this._inputsArray = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._inputErrorClass = validationSettings.inputErrorClass;
    this._errorClass = validationSettings.errorClass;
    this._buttonElement = this._form.querySelector(validationSettings.submitButtonSelector);
    this._inactiveButtonClass = validationSettings.inactiveButtonClass;
  }

  enableValidation() {
    this._form.addEventListener('submit', event => {
      event.preventDefault();
    })
    this._setInputListeners();
  }

  // назначение обработчиков на поля форм
  _setInputListeners() {
    this._inputsArray.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  // проверка поля на валидность
  _checkInputValidity(inputElement) {
    this._inputElement = inputElement;
    this._inputErrorPlace = document.getElementById(`${this._inputElement.name}-error`);
    this._errorMessage = this._inputElement.validationMessage;

    if (this._inputElement.validity.valid) {
      this._hideInputError();
    } else {
      this._showInputError();
    }
  }

  // скрыть ошибку
  _hideInputError() {
    this._inputElement.classList.remove(this._inputErrorClass);
    this._inputErrorPlace.classList.remove(this._errorClass);
  }

  // показать ошибку
  _showInputError() {
    this._inputElement.classList.add(this._inputErrorClass);
    this._inputErrorPlace.textContent = this._errorMessage;
    this._inputErrorPlace.classList.add(this._errorClass);
  }

  // настройка состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.deactivateButton();
    } else {
      this._activateButton();
    }
  }

  // проверка формы на наличие невалидных полей
  _hasInvalidInput() {
    return this._inputsArray.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // выключение кнопки
  // метод публичный, так как он понадобится в index.js
  deactivateButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  // включение кнопки
  _activateButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  // очистка ошибок
  // метод публичный, так как он понадобится в index.js
  hideAllErrors() {
    this._inputsArray.forEach(inputElement => {
      this._inputElement = inputElement;
      this._inputErrorPlace = document.getElementById(`${inputElement.name}-error`);
      this._hideInputError();
    })
  }
}