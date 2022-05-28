export default class UserInfo {
  constructor ( { userName, userAbout, userAvatar } ) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
    this.userId = '';
  }

  // возвращаем данные пользователя для подстановки в форму при ее открытии
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
      userAvatar: this._userAvatar.src,
      userId: this.userId
    };
  }

  // принимаем новые данные пользователя из формы и добавляем их на страницу
  setUserInfo (userData) {
    this._userName.textContent = userData.name;
    this._userAbout.textContent = userData.about;
    this.userId = userData._id;
  }

  setUserAvatar (avatar) {
    this._userAvatar.src = avatar;
  }
}