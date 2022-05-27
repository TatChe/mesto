export const renderLoading = (popup, isLoading = false) => {
  const submitButton = document.querySelector(popup).querySelector('.popup__button-submit');

  if ( isLoading ) {
    submitButton.textContent = 'Сохранение ...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

// вызываем ее в хэндлере отправки формы и в момент получения ответа от API после создания нового элемента