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

// имя пользователя и его профессию
const userName = document.querySelector(".user__name");
const userAbout = document.querySelector(".user__about");

// кнопки
const editProfileBtn = document.querySelector(".button_action_edit");
const addCardBtn = document.querySelector(".button_action_add");

// попапы
const editProfilePopup = document.querySelector(".popup_action_profile-edit");
const addCardPopup = document.querySelector(".popup_action_card-add");
const viewCardPopup = document.querySelector(".popup_action_card-view");

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
editProfileBtn.addEventListener ("click", () => openPopup(editProfilePopup));
addCardBtn.addEventListener ("click", () => openPopup(addCardPopup));

// универсальный слушатель на body для закрывания попапов
document.body.addEventListener("click", event => {
  const popup = event.target.closest(".popup");
  // если кликнули по кнопке закрытия, то закрываем попап
  if (popup && event.target.classList.contains("button_action_close")) {
    closePopup(popup);
  }
  return;
})

// слушатели submit-событий в формах
editProfileForm.addEventListener("submit", saveChanges);
addCardForm.addEventListener("submit", addNewCard);


// открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");

  if (popup === editProfilePopup) {
    viewUserData();
  }
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

// заполнение полей в попапе редактирования юзера
function viewUserData() {
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userAbout.textContent;
}

// отображение картинки и подписи в попапе просмотра карточки
function viewImage(card) {
  // получаем имя и картинку из карточки
  const cardImage = card.querySelector(".element__img").src;
  const cardName = card.querySelector(".element__name").textContent;

  // записываем имя и картинку в попап
  viewCardPopup.querySelector(".popup__place-name").textContent = cardName;
  viewCardPopup.querySelector(".popup__image").src = cardImage;

  openPopup(viewCardPopup);
}

// сохранение значений для профиля пользователя
function saveChanges(event) {
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

  // обнуляем поля ввода
  inputCardName.value = null;
  inputCardImg.value = null;
}


// установка и снятие like
const likeUnlike = (event) => {
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

  // // наполняем содержимым
  cardItem.querySelector(".element__name").textContent = card.name;
  cardItem.querySelector(".element__img").src = card.link;

  // навешиваем обработчики событий
  cardItem.querySelector(".button_action_like").addEventListener("click", likeUnlike);
  cardItem.querySelector(".button_action_delete").addEventListener("click", deleteCard);
  cardItem.querySelector(".element__img").addEventListener("click", () => viewImage(cardItem));

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
initialCards.forEach(card => { renderCard(card); });