// массив с изначальными карточками
const initialCards = [
  {
    name: "Архыз",
    link: "../images/element-arkhyz.jpeg"
  },
  {
    name: "Челябинская область",
    link: "../images/element-chelyabinsk-oblast.jpeg"
  },
  {
    name: "Иваново",
    link: "../images/element-ivanovo.jpeg"
  },
  {
    name: "Камчатка",
    link: "../images/element-kamchatka.jpeg"
  },
  {
    name: "Холмогорский район",
    link: "../images/element-kholmogorsky-rayon.jpeg"
  },
  {
    name: "Байкал",
    link: "../images/element-baikal.jpeg"
  }
];

// контейнер для добавления карточек
const cardsContainer = document.querySelector(".elements");

// имя пользователя и его профессия
const userName = document.querySelector(".user__name");
const userAbout = document.querySelector(".user__about");

// кнопки
const editProfileBtn = document.querySelector(".button_action_edit");
const addCardBtn = document.querySelector(".button_action_add");

// попапы
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector(".popup_action_profile-edit");
const addCardPopup = document.querySelector(".popup_action_card-add");
const viewCardPopup = document.querySelector(".popup_action_card-view");

// элементы в попапе просмотра картинки
const viewCardPopupImg = viewCardPopup.querySelector(".popup__image");
const viewCardPopupName = viewCardPopup.querySelector(".popup__place-name");

// формы в попапах
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const addCardForm = addCardPopup.querySelector(".popup__form");
// поля для профиля
const inputUserName = editProfileForm.querySelector(".popup__input_data_name");
const inputUserAbout = editProfileForm.querySelector(".popup__input_data_about");
// поля для карточки
const inputCardName = addCardForm.querySelector(".popup__input_data_img-title");
const inputCardImg = addCardForm.querySelector(".popup__input_data_img-src");

// слушатели кликов по кнопкам для открытия попапов
editProfileBtn.addEventListener ("click", () => viewUserData(editProfilePopup));
addCardBtn.addEventListener ("click", () => openPopup(addCardPopup));

// слушатели для всех попапов на клик по крестику
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("button_action_close")) {
      closePopup(popup);
    }
  })
})

// слушатели submit-событий в формах
editProfileForm.addEventListener("submit", saveProfileChanges);
addCardForm.addEventListener("submit", addNewCard);


// открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// заполнение полей в попапе редактирования пользователя
function viewUserData(popup) {
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userAbout.textContent;
  openPopup(popup);
}

// отображение картинки и подписи в попапе просмотра карточки
function viewImage(card) {
  // получаем имя и картинку из карточки
  const cardImage = card.querySelector(".element__img").src;
  const cardName = card.querySelector(".element__name").textContent;

  // записываем имя, картинку и alt в попап
  viewCardPopupName.textContent = cardName;
  viewCardPopupImg.alt = cardName;
  viewCardPopupImg.src = cardImage;

  openPopup(viewCardPopup);
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


// добавление новой карточки
function addNewCard(event) {
  event.preventDefault();

  const cardData = {};
  cardData.name = inputCardName.value;
  cardData.link = inputCardImg.value;

  // добавляем карточку только если заполнены оба поля
  if (cardData.name != "" && cardData.link != "") {
    renderCard(cardData);
  }
  closePopup(addCardPopup);

  // обнуляем форму
  addCardForm.reset();
}


// установка и снятие like
const toggleLike = (event) => {
  event.currentTarget.classList.toggle("button_like-active");
};

// удаление карточки
const deleteCard = (event) => {
  const card = event.currentTarget.closest(".element");
  card.remove();
};


// создание карточки по шаблону
const createCard = (card) => {
  // сохраняем template
  const cardTemplate = document.querySelector(".card-template").content;

  // клонируем содержимое тега template
  const cardItem = cardTemplate.querySelector(".element").cloneNode(true);

  // сохраняем картинку
  const cardItemImg = cardItem.querySelector(".element__img");

  // // наполняем содержимым
  cardItem.querySelector(".element__name").textContent = card.name;
  cardItemImg.alt = card.name;
  cardItemImg.src = card.link;

  // навешиваем обработчики событий
  cardItem.querySelector(".button_action_like").addEventListener("click", toggleLike);
  cardItem.querySelector(".button_action_delete").addEventListener("click", deleteCard);
  cardItemImg.addEventListener("click", () => viewImage(cardItem));

  // возвращаем получившуюся карточку
  return cardItem;
};


// рендер карточки
const renderCard = (card) => {
  // создаем карточку на основе данных
  const cardItem = createCard(card);
  // помещаем карточку в контейнер
  cardsContainer.prepend(cardItem);
};

// создание и рендер изначальных карточек
initialCards.forEach(renderCard);