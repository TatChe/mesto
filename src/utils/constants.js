const arkhyzImage = new URL('../images/element-arkhyz.jpg', import.meta.url);
const chelyabinskImage = new URL('../images/element-chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('../images/element-ivanovo.jpg', import.meta.url);
const kamchatkaImage = new URL('../images/element-kamchatka.jpg', import.meta.url);
const kholmogorskyImage = new URL('../images/element-kholmogorsky-rayon.jpg', import.meta.url);
const baikalImage = new URL('../images/element-baikal.jpg', import.meta.url);

// массив с изначальными карточками
export const initialCards = [
  { name: 'Архыз', link: arkhyzImage },
  { name: 'Челябинская область', link: chelyabinskImage },
  { name: 'Иваново', link: ivanovoImage },
  { name: 'Камчатка', link: kamchatkaImage },
  { name: 'Холмогорский район', link: kholmogorskyImage },
  { name: 'Байкал', link: baikalImage }
];

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

// имя пользователя и его профессия
export const userName = document.querySelector('.user__name');
export const userAbout = document.querySelector('.user__about');

// кнопки
export const editProfileBtn = document.querySelector('.user__button-edit');
export const addCardBtn = document.querySelector('.profile__button-add');

// поля для профиля
export const inputUserName = document.querySelector('.popup__input_data_name');
export const inputUserAbout = document.querySelector('.popup__input_data_about');