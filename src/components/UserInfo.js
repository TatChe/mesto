export default class UserInfo {
  constructor ( { userName, userAbout } ) {
    this._userName = userName;
    this._userAbout = userAbout;
  }

  // возвращаем данные пользователя для подстановки в форму при ее открытии
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent
    };
  }

  // принимаем новые данные пользователя из формы и добавляем их на страницу
  setUserInfo(userData) {
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
  }
}