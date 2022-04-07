const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

// запуск валидации
// здесь нам нужен только formSelector
// поэтому остальные параметры передаем как ...rest
const enableValidation = ({formSelector, ...rest}) => {
  const formsArray = Array.from(document.querySelectorAll(formSelector));
  
  formsArray.forEach(formElement => {
    formElement.addEventListener("submit", event => {
      event.preventDefault();
    })
    setInputListeners(formElement, rest);
  })
}

// назначение обработчиков на поля форм
const setInputListeners = (formElement, {inputSelector, ...rest}) => {
  const inputsArray = Array.from(formElement.querySelectorAll(inputSelector));

  // проверяем состояние кнопки при открытии формы
  toggleButtonState(formElement, inputsArray, rest);

  inputsArray.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement, rest);
      toggleButtonState(formElement, inputsArray, rest);
    })
  })
}

// проверка ввода
const checkInputValidity = (inputElement, {...rest}) => {
  const inputErrorPlace = document.getElementById(`${inputElement.name}-error`);
  if (inputElement.validity.valid) {
    hideInputError(inputElement, inputErrorPlace, rest);
  } else {
    showInputError(inputElement, inputElement.validationMessage, inputErrorPlace, rest);
  }
}

// показать ошибку
const showInputError = (inputElement, errorMessage, inputErrorPlace, {inputErrorClass, errorClass, ...rest}) => {
  inputElement.classList.add(inputErrorClass);
  inputErrorPlace.textContent = errorMessage;
  inputErrorPlace.classList.add(errorClass);
}

// скрыть ошибку
const hideInputError = (inputElement, inputErrorPlace, {inputErrorClass, errorClass, ...rest}) => {
  inputElement.classList.remove(inputErrorClass);
  inputErrorPlace.classList.remove(errorClass);
}

// проверка формы на наличие невалидных полей
const hasInvalidInput = (inputsArray) => {
  return inputsArray.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// управление состоянием кнопки
const toggleButtonState = (formElement, inputsArray, {submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const buttonElement = formElement.querySelector(submitButtonSelector);

  if (hasInvalidInput(inputsArray)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}


enableValidation(validationSettings);