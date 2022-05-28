import './index.css';

import {
  token,
  cardTemplate,
  editProfileBtn,
  addCardBtn,
  avatarEditBtn,
  validationSettings,
  inputUserName,
  inputUserAbout,
  userName,
  userAbout,
  userAvatar,
} from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';



// API
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});


// экземпляр класса с инфой о пользователе
const userInfo = new UserInfo({ userName, userAbout, userAvatar });

// контейнер для карточек
const cardsList = new Section( { renderer: createCard }, '.elements' );

// попапы
const userEditPopup = new PopupWithForm('.popup_action_profile-edit', saveProfileChanges);
const avatarEditPopup = new PopupWithForm('.popup_action_avatar-edit', saveAvatarChanges);
const viewCardPopup = new PopupWithImage('.popup_action_card-view');
const addCardPopup = new PopupWithForm('.popup_action_card-add', addNewCard);
const deleteCardPopup = new PopupWithConfirm('.popup_action_card-delete');

// валидаторы форм
const validatorEditProfileForm = new FormValidator(userEditPopup.form, validationSettings);
const validatorEditAvatarForm = new FormValidator(avatarEditPopup.form, validationSettings);
const validatorAddCardForm = new FormValidator(addCardPopup.form, validationSettings);


// обработчик сабмита формы с данными пользователя
function saveProfileChanges(inputsData) {
  userEditPopup.renderLoading(true)
  api.patchUserData(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      userEditPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => userEditPopup.renderLoading(false));
}

// обработчик сабмита формы с аватаром
function saveAvatarChanges(avatar) {
  avatarEditPopup.renderLoading(true)
  api.patchUserAvatar(avatar)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      avatarEditPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarEditPopup.renderLoading(false));
}

// создание карточки из класса, добавление в разметку
function createCard(item) {
  const card = new Card( {
    data: item,
    handleCardClick: viewCardImage,
    handleDeleteClick: () => {
      // устанавливаем обработчик сабмита
      deleteCardPopup.setSubmitAction (_ => {
        // прокидываем карточку
        deleteMyCard(card);
      })
      // открываем попап с уже остановленным обработчиком сабмита
      deleteCardPopup.open();
    },
    handleLikeClick: likeSwitcher
  }, cardTemplate, userInfo.userId);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

// добавление карточки из попапа
function addNewCard(inputsData) {
  addCardPopup.renderLoading(true);
  api.postCard(inputsData)
    .then((data) => {
      createCard({
        title: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        owner: data.owner._id
      });
      addCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => addCardPopup.renderLoading(false));
}

// обработка клика на карточку
function viewCardImage(cardName, cardLink) {
  viewCardPopup.open(cardName, cardLink);
}

// удаление карточки
function deleteMyCard(card) {
  api.deleteCard(card)
    .then((data) => {
      card.deleteCard();
    })
    .catch((err) => console.log(err));
}

// лайк карточки
function likeSwitcher(card) {
  // проверяем, есть ли у карточки наш лайк
  if ( card.isLiked() ) {
    // снимаем лайк
    api.deleteCardLike(card)
    .then((data) => {
      card.setLikes(data);
    })
    .catch((err) => console.log(err));
  } else {
    // устанавливаем лайк
    api.putCardLike(card)
    .then((data) => {
      card.setLikes(data);
    })
    .catch((err) => console.log(err));
  }
}


api.getStartedData()
  .then( (data) => {
    const [ userData, cardsData ] = data;

    /* *** работа с пользователем *** */

    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    // слушатели кликов по кнопкам открытия попапов
    editProfileBtn.addEventListener ('click', () => {
      const userData = userInfo.getUserInfo();
      inputUserName.value = userData.userName;
      inputUserAbout.value = userData.userAbout;
      validatorEditProfileForm.deactivateButton(); // состояние кнопки при открытии формы
      validatorEditProfileForm.hideAllErrors(); // очищаем ошибки
      userEditPopup.open();
    })

    avatarEditBtn.addEventListener ('click', () => {
      validatorEditAvatarForm.deactivateButton();
      validatorEditAvatarForm.hideAllErrors();
      avatarEditPopup.open();
    })

    // включение валидации форм
    validatorEditProfileForm.enableValidation();
    validatorEditAvatarForm.enableValidation();

    // слушатели в попапах
    userEditPopup.setEventListeners();
    avatarEditPopup.setEventListeners();
    

    /* *** работа с карточками *** */

    // рендер исходных карточек
    cardsList.renderAllItems( cardsData.reverse().map((item) => ({
      title: item.name,
      link: item.link,
      likes: item.likes,
      id: item._id,
      owner: item.owner._id
    })));

    // слушатель клика на кноку добавления карточки
    addCardBtn.addEventListener ('click', () => {
      validatorAddCardForm.deactivateButton(); // состояние кнопки при открытии формы
      validatorAddCardForm.hideAllErrors(); // очищаем ошибки
      addCardPopup.open();
    })

    // включение валидациии для формы добавления карточки
    validatorAddCardForm.enableValidation();

    // слушатели в попапах
    viewCardPopup.setEventListeners();
    addCardPopup.setEventListeners();
    deleteCardPopup.setEventListeners();

  }).catch((err) => console.log(err));