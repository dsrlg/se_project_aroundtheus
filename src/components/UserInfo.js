export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector , avatar}) {
    this._avatar = avatar;
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._userName ? this._userName.textContent : " ",
      description: this._userDescription
        ? this._userDescription.textContent
        : " ",
       avatar:  this._avatar ? this. _avatar :" "
    };
  }

  setUserInfo({avatar, name, description }) {
    this._userName.textContent = name;
    this._avatar = avatar;
    this._userDescription.textContent = description;
  }
}
