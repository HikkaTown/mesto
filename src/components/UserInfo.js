export default class UserInfo {
  constructor({nameSelector, descriptionSelctor}) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelctor);
  }

  getUserInfo = () => {
    return {
      userName: this._userName.textContent,
      userDescription: this._userDescription.textContent
    }
  }

  setUserInfo = (name, description) => {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}