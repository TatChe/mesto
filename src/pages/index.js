import './index.css';

import {
  // initialCards,
  cardTemplate,
  editProfileBtn,
  addCardBtn,
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



// данные пользователя
api.getUserData()
  .then((data) => {
    userName.textContent = data.name;
    userAbout.textContent = data.about;
    userAvatar.src = data.avatar;

    const userInfo = new UserInfo({userName, userAbout});

    // попап
    const userEditPopup = new PopupWithForm('.popup_action_profile-edit', saveProfileChanges);

    // валидатор формы
    const validatorEditProfileForm = new FormValidator(userEditPopup.form, validationSettings);
    validatorEditProfileForm.enableValidation();

    // слушатель в попапе
    userEditPopup.setEventListeners();

    // слушатели кликов по кнопкам открытия попапов
    editProfileBtn.addEventListener ('click', () => {
      inputUserName.value = userInfo.getUserInfo().userName;
      inputUserAbout.value = userInfo.getUserInfo().userAbout;
      validatorEditProfileForm.deactivateButton(); // состояние кнопки при открытии формы
      validatorEditProfileForm.hideAllErrors(); // очищаем ошибки
      userEditPopup.open();
    });

    // обработчик сабмита формы с данными пользователя
    function saveProfileChanges(inputsData) {
      api.patchUserData(inputsData)
        .then((data) => {
          userInfo.setUserInfo(data);
          userEditPopup.close();
        })
        .catch((err) => console.log(err));
    }

}).catch((err) => console.log(err));




// карточки
api.getAllCards()
  .then((data) => {

    // контейнер для карточек
    const cardsList = new Section(
      {
        items: data.map((item) => ({title: item.name, link: item.link})),
        renderer: createCard
      },
      '.elements'
    );

    // рендер исходных карточек
    cardsList.renderAllItems();

    // попапы
    const viewCardPopup = new PopupWithImage('.popup_action_card-view');
    const addCardPopup = new PopupWithForm('.popup_action_card-add', addNewCard);

    // валидатор формы добавления карточки
    const validatorAddCardForm = new FormValidator(addCardPopup.form, validationSettings);
    validatorAddCardForm.enableValidation();

    // слушатели в попапах
    viewCardPopup.setEventListeners();
    addCardPopup.setEventListeners();
    
    // создание карточки из класса, добавление в разметку
    function createCard(item) {
      const card = new Card( {data: item, handleCardClick: viewCardImage}, cardTemplate);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }

    // слушатель клика на кноку добавления карточки
    addCardBtn.addEventListener ('click', () => {
      validatorAddCardForm.deactivateButton(); // состояние кнопки при открытии формы
      validatorAddCardForm.hideAllErrors(); // очищаем ошибки
      addCardPopup.open();
    });

    // добавление карточки из попапа
    function addNewCard(inputsData) {
      api.postCard(inputsData)
        .then((data) => {
          createCard({title: data.name, link: data.link});
          addCardPopup.close();
        })
        .catch((err) => console.log(err));
    }

    // обработка клика на карточку
    function viewCardImage(cardName, cardLink) {
      viewCardPopup.open(cardName, cardLink);
    }

}).catch((err) => console.log(err));