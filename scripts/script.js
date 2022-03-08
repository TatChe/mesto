// получаем кнопку редактирования профиля
let popupOpen = document.querySelector(".button_action_edit");

// получаем имя пользователя и его профессию
let userName = document.querySelector(".user__name");
let userAbout = document.querySelector(".user__about");

// получаем попап
let popup = document.querySelector(".popup");
// кнопка закрытия попапа
let popupClose = popup.querySelector(".button_action_close");
// форма в попапе
let popupForm = popup.querySelector(".popup__form");
// поле ввода имени пользователя
let inputUserName = popup.querySelector(".popup__input_data_name");
// поле ввода профессии пользователя
let inputUserAbout = popup.querySelector(".popup__input_data_about");


// функция открытия попапа
function openPopup() {
  // проверяем на наличие у попапа класса, в котором включается отображение попапа
  if (popup.classList.contains("popup_opened")) {
    return;
  } else {
    popup.classList.add("popup_opened");
    // заполняем поля ввода значениями имени и профессии пользователя
    inputUserName.value = userName.textContent;
    inputUserAbout.value = userAbout.textContent;
  }
}

// функция закрытия попапа
function closePopup() {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  } else {
    return;
  }
}

// функция сохранения значений
function saveChanges(evt) {
  // предотвращаем перезагрузку страницы после события отправки формы
  evt.preventDefault()
  // записываем значения из полей ввода в имя и профессию пользователя на странице
  userName.textContent = inputUserName.value;
  userAbout.textContent = inputUserAbout.value;
  // вызываем функцию закрытия попапа
  closePopup();
}

// обработчик события клика по кнопке редактирования профиля
popupOpen.addEventListener("click", openPopup);
// обработчик события клика по кнопке закрытия попапа
popupClose.addEventListener("click", closePopup);
// обработчик события отправки формы в попапе
popupForm.addEventListener("submit", saveChanges);