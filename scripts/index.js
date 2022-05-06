import {
  initialCards,
  cardTemplate,
  cardsContainer,
  editProfileBtn,
  addCardBtn,
  popups,
  editProfilePopup,
  addCardPopup,
  viewCardPopup,
  viewCardPopupName,
  viewCardPopupImg,
  validationSettings,
  editProfileForm,
  addCardForm,
  inputUserName,
  inputUserAbout,
  userName,
  userAbout,
  inputCardName,
  inputCardImg
} from './constants.js';

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';


// включение валидации для всех форм
const validatorEditProfileForm = new FormValidator(editProfileForm, validationSettings);
validatorEditProfileForm.enableValidation();
const validatorAddCardForm = new FormValidator(addCardForm, validationSettings);
validatorAddCardForm.enableValidation();


/* *** функции *** */

// открытие попапа
function openPopup(popup) {
  // popup.classList.add('popup_opened');
  // слушатель нажатия на Esc
  document.addEventListener('keydown', handleEscUp);
}

// закрытие попапа
function closePopup(popup) {
  document.removeEventListener('keydown', handleEscUp);
  // popup.classList.remove('popup_opened');
}

// закрытие по Esc
// const handleEscUp = (evt) => {
//   if (evt.key === 'Escape') {
//     const currentPopup = document.querySelector('.popup_opened');
//     closePopup(currentPopup);
//   }
// }

// подготовка формы редактирования пользователя
function openUserDataForm(popup) {
  // заполнение полей
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userAbout.textContent;
  
  const currentForm = popup.querySelector('.popup__form');
  const currentSubmitButton = currentForm.querySelector('.popup__button-submit');

  // устанавливаем состояние кнопки при каждом открытии формы
  validatorEditProfileForm.deactivateButton();

  // очищаем ошибки
  validatorEditProfileForm.hideAllErrors();

  openPopup(popup);
}

// подготовка формы добавления карточки
function openAddCardForm(popup) {
  const currentForm = popup.querySelector('.popup__form');
  const currentSubmitButton = currentForm.querySelector('.popup__button-submit');
  currentForm.reset();

  // устанавливаем состояние кнопки при каждом открытии формы
  validatorAddCardForm.deactivateButton();

  // очищаем ошибки
  validatorAddCardForm.hideAllErrors();

  openPopup(popup);
}

// сохранение значений для профиля пользователя
function saveProfileChanges(event) {
  // предотвращаем перезагрузку страницы после события отправки формы
  event.preventDefault();
  // записываем значения из полей ввода на страницу
  userName.textContent = inputUserName.value;
  userAbout.textContent = inputUserAbout.value;
  // закрываем popup
  closePopup(editProfilePopup);
}

// отображение картинки и подписи в попапе просмотра карточки
// function viewCardImage(cardName, cardImage) {
//   viewCardPopupName.textContent = cardName;
//   viewCardPopupImg.alt = cardName;
//   viewCardPopupImg.src = cardImage;

//   openPopup(viewCardPopup);
// }

// создание карточки из класса, добавление в разметку
function createCard(data, cardTemplate, viewCardImage) {
  const card = new Card(data, cardTemplate, viewCardImage);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

// добавление новой карточки из попапа
function addNewCard(event) {
  event.preventDefault();

  createCard(
    {
      name: inputCardName.value,
      link: inputCardImg.value
    },
    cardTemplate,
    viewCardImage
  );

  closePopup(addCardPopup);
}

/* *** end *** */


/* *** слушатели *** */

// слушатели кликов по кнопкам для открытия попапов
editProfileBtn.addEventListener ('click', () => openUserDataForm(editProfilePopup));
addCardBtn.addEventListener ('click', () => openAddCardForm(addCardPopup));

// слушатели для всех попапов на клик по крестику или по оверлею
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup__button-close') || event.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
})

// слушатели submit-событий в формах
editProfileForm.addEventListener('submit', saveProfileChanges);
addCardForm.addEventListener('submit', addNewCard);

/* *** end *** */


// создание стартовых карточек
initialCards.forEach((item) => {
  createCard(item, cardTemplate, viewCardImage);
});

// const cardsList = new Section ( {initialCards, }, '.elements')