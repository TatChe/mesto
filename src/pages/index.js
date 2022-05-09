import './index.css';

import {
  initialCards,
  cardTemplate,
  editProfileBtn,
  addCardBtn,
  validationSettings,
  inputUserName,
  inputUserAbout,
  userName,
  userAbout,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';



/*** константы ***/

// данные пользователя
const userInfo = new UserInfo({userName, userAbout});

// контейнер для карточек
const cardsList = new Section( {items: initialCards, renderer: createCard}, '.elements');

// попапы
const userEditPopup = new PopupWithForm('.popup_action_profile-edit', saveProfileChanges);
const viewCardPopup = new PopupWithImage('.popup_action_card-view');
const addCardPopup = new PopupWithForm('.popup_action_card-add', addNewCard);

// валидаторы форм
const validatorEditProfileForm = new FormValidator(userEditPopup.form, validationSettings);
const validatorAddCardForm = new FormValidator(addCardPopup.form, validationSettings);



/*** функции ***/

// создание карточки из класса, добавление в разметку
function createCard(item) {
  const card = new Card( {data: item, handleCardClick: viewCardImage}, cardTemplate);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

// добавление карточки из попапа
function addNewCard(inputsData) {
  createCard(inputsData);
  addCardPopup.close();
}

// обработчик сабмита формы с данными пользователя
function saveProfileChanges(inputsData) {
  userInfo.setUserInfo(inputsData);
  userEditPopup.close();
}

// обработка клика на карточку
function viewCardImage(cardName, cardLink) {
  viewCardPopup.open(cardName, cardLink);
}



/*** остальное ***/

// рендер исходных карточек
cardsList.renderAllItems();

// включение валидации форм
validatorEditProfileForm.enableValidation();
validatorAddCardForm.enableValidation();

// слушатели в попапах
userEditPopup.setEventListeners();
viewCardPopup.setEventListeners();
addCardPopup.setEventListeners();

// слушатели кликов по кнопкам открытия попапов
editProfileBtn.addEventListener ('click', () => {
  inputUserName.value = userInfo.getUserInfo().userName;
  inputUserAbout.value = userInfo.getUserInfo().userAbout;
  validatorEditProfileForm.deactivateButton(); // состояние кнопки при открытии формы
  validatorEditProfileForm.hideAllErrors(); // очищаем ошибки
  userEditPopup.open();
});

addCardBtn.addEventListener ('click', () => {
  validatorAddCardForm.deactivateButton(); // состояние кнопки при открытии формы
  validatorAddCardForm.hideAllErrors(); // очищаем ошибки
  addCardPopup.open();
});