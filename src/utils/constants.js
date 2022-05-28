// токен для авторизации
export const token = '1d4d3067-933d-44bd-90ee-5ffcfa07139c';

// шаблон для верстки карточки
export const cardTemplate = '.card-template';

// настройки валидации
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

// данные пользователя
export const userName = document.querySelector('.user__name');
export const userAbout = document.querySelector('.user__about');
export const userAvatar = document.querySelector('.user__avatar');

// кнопки
export const editProfileBtn = document.querySelector('.user__button-edit');
export const addCardBtn = document.querySelector('.profile__button-add');
export const avatarEditBtn = document.querySelector('.user__avatar-edit');

// поля для профиля
export const inputUserName = document.querySelector('.popup__input_data_name');
export const inputUserAbout = document.querySelector('.popup__input_data_about');