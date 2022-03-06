let popupOpen = document.querySelector(".user__edit-button");

let userName = document.querySelector(".user__name");
let userAbout = document.querySelector(".user__about");

let popup = document.querySelector(".popup");
let popupClose = popup.querySelector(".popup__btn-close");
let popupForm = popup.querySelector(".popup__form");
let inputUserName = popup.querySelector(".popup__input_data_name");
let inputUserAbout = popup.querySelector(".popup__input_data_about");


function openPopup() {
  popup.classList.add("popup_opened");
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userAbout.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function saveChanges(evt) {
  evt.preventDefault()
  userName.textContent = inputUserName.value;
  userAbout.textContent = inputUserAbout.value;
  closePopup();
}

popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
popupForm.addEventListener("submit", saveChanges);