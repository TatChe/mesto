import './index.css';

import {
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

import { renderLoading } from '../utils/utils.js';
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
    authorization: '1d4d3067-933d-44bd-90ee-5ffcfa07139c',
    'Content-Type': 'application/json'
  }
});


api.getStartedData()
  .then( (data) => {
    const [ userData, cardsData ] = data;

    /* *** работа с пользователем *** */
    userName.textContent = userData.name;
    userAbout.textContent = userData.about;
    userAvatar.src = userData.avatar;

    const userInfo = new UserInfo({userName, userAbout});
    const currentUserID = userData._id;

    // попапы
    const userEditPopup = new PopupWithForm('.popup_action_profile-edit', saveProfileChanges);
    const avatarEditPopup = new PopupWithForm('.popup_action_avatar-edit', saveAvatarChanges);

    // валидатор форм
    const validatorEditProfileForm = new FormValidator(userEditPopup.form, validationSettings);
    const validatorEditAvatarForm = new FormValidator(avatarEditPopup.form, validationSettings);
    validatorEditProfileForm.enableValidation();
    validatorEditAvatarForm.enableValidation();

    // слушатели в попапах
    userEditPopup.setEventListeners();
    avatarEditPopup.setEventListeners();

    // слушатели кликов по кнопкам открытия попапов
    editProfileBtn.addEventListener ('click', () => {
      inputUserName.value = userInfo.getUserInfo().userName;
      inputUserAbout.value = userInfo.getUserInfo().userAbout;
      validatorEditProfileForm.deactivateButton(); // состояние кнопки при открытии формы
      validatorEditProfileForm.hideAllErrors(); // очищаем ошибки
      userEditPopup.open();
    })

    avatarEditBtn.addEventListener ('click', () => {
      validatorEditAvatarForm.deactivateButton();
      validatorEditAvatarForm.hideAllErrors();
      avatarEditPopup.open();
    })


    // обработчик сабмита формы с данными пользователя
    function saveProfileChanges(inputsData) {
      renderLoading ('.popup_action_profile-edit', true);
      api.patchUserData(inputsData)
        .then((data) => {
          renderLoading ('.popup_action_profile-edit', false);
          userInfo.setUserInfo(data);
          userEditPopup.close();
        })
        .catch((err) => console.log(err));
    }

    // обработчик сабмита формы с аватаром
    function saveAvatarChanges(avatar) {
      renderLoading ('.popup_action_avatar-edit', true);
      api.patchUserAvatar(avatar)
        .then((data) => {
          renderLoading ('.popup_action_avatar-edit', true);
          userAvatar.src = data.avatar;
          avatarEditPopup.close();
        })
        .catch((err) => console.log(err));
    }


    /* *** работа с карточками *** */

    // контейнер для карточек
    const cardsList = new Section(
      {
        items: cardsData.map((item) => ({
          title: item.name,
          link: item.link,
          likes: item.likes,
          id: item._id,
          owner: item.owner._id
        })),
        renderer: createCard
      },
      '.elements'
    )

    // рендер исходных карточек
    cardsList.renderAllItems();

    // попапы
    const viewCardPopup = new PopupWithImage('.popup_action_card-view');
    const addCardPopup = new PopupWithForm('.popup_action_card-add', addNewCard);
    const deleteCardPopup = new PopupWithConfirm('.popup_action_card-delete');

    // валидатор формы добавления карточки
    const validatorAddCardForm = new FormValidator(addCardPopup.form, validationSettings);
    validatorAddCardForm.enableValidation();

    // слушатели в попапах
    viewCardPopup.setEventListeners();
    addCardPopup.setEventListeners();
    deleteCardPopup.setEventListeners();
    
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
      }, cardTemplate, currentUserID);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }

    // слушатель клика на кноку добавления карточки
    addCardBtn.addEventListener ('click', () => {
      validatorAddCardForm.deactivateButton(); // состояние кнопки при открытии формы
      validatorAddCardForm.hideAllErrors(); // очищаем ошибки
      addCardPopup.open();
    })

    // добавление карточки из попапа
    function addNewCard(inputsData) {
      renderLoading ('.popup_action_card-add', true);
      api.postCard(inputsData)
        .then((data) => {
          renderLoading ('.popup_action_card-add', true);
          createCard({
            title: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            owner: data.owner._id
          });
          addCardPopup.close();
        })
        .catch((err) => console.log(err));
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
      if ( card.likes.some((like) => like._id == currentUserID ) ) {
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

  }).catch((err) => console.log(err));