export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, avatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName ? this._userName.textContent : " ",
      description: this._userDescription ? this._userDescription.textContent : " ",
      avatar: this._avatar ? this._avatar.src : " "
    };
  }

  setUserInfo({name, description }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
    
  }
  setAvatar(avatar){
    if (this._avatar) {
        this._avatar.src = avatar;
      }
  }
}
