export default class UserInfo {
  constructor({nameSelector, descriptionSelctor}) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelctor);
    this._userId = null;
  }

  getUserInfo = () => {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    }
  }

  setUserInfo = (name, description, userID) => {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
    this._userId = userID ? userID : this._userId;
  }

  getUserId = () => {
    return this._userId;
  }
}