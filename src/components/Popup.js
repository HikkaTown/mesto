export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector(".popup__close");
  }

  _handleEscClose = (e) => {
    if(e.key === 'Escape' || e.target === this._closeBtn || e.target === this._popup) {
      this.close();
    }
  }

  _setEventListeners = () => {
    this._popup.addEventListener('click', this._handleEscClose);
    this._closeBtn.addEventListener('click', this._handleEscClose);
    window.addEventListener('keyup', this._handleEscClose);
  }

  _removeEventListeners = () => {
    this._popup.removeEventListener('click', this._handleEscClose);
    this._closeBtn.removeEventListener('click', this._handleEscClose);
    window.removeEventListener('keyup', this._handleEscClose);
  }

  open = () => {
    this._popup.classList.add('popup_opened');
    document.querySelector('.page').classList.add('overflow-hidden');
    this._setEventListeners();
  }

  close = () => {
    this._popup.classList.remove('popup_opened');
    document.querySelector('.page').classList.remove('overflow-hidden');
    this._removeEventListeners();
  }
}