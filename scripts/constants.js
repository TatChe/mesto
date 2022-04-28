// массив с изначальными карточками
export const initialCards = [
  {
    name: 'Архыз',
    link: 'images/element-arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'images/element-chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'images/element-ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'images/element-kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'images/element-kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'images/element-baikal.jpg'
  }
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

// контейнер для добавления карточек
export const cardsContainer = document.querySelector('.elements');

// имя пользователя и его профессия
export const userName = document.querySelector('.user__name');
export const userAbout = document.querySelector('.user__about');

// кнопки
export const editProfileBtn = document.querySelector('.user__button-edit');
export const addCardBtn = document.querySelector('.profile__button-add');

// попапы
export const popups = document.querySelectorAll('.popup');
export const editProfilePopup = document.querySelector('.popup_action_profile-edit');
export const addCardPopup = document.querySelector('.popup_action_card-add');
export const viewCardPopup = document.querySelector('.popup_action_card-view');

// элементы в попапе просмотра картинки
export const viewCardPopupImg = viewCardPopup.querySelector('.popup__image');
export const viewCardPopupName = viewCardPopup.querySelector('.popup__place-name');


// формы в попапах
export const forms = document.querySelectorAll('.popup__form');
export const editProfileForm = editProfilePopup.querySelector('.popup__form');
export const addCardForm = addCardPopup.querySelector('.popup__form');

// поля для профиля
export const inputUserName = editProfileForm.querySelector('.popup__input_data_name');
export const inputUserAbout = editProfileForm.querySelector('.popup__input_data_about');

// поля для карточки
export const inputCardName = addCardForm.querySelector('.popup__input_data_img-title');
export const inputCardImg = addCardForm.querySelector('.popup__input_data_img-src');