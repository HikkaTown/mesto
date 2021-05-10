import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('form');
    this._handleSubmitForm = handleSubmit;
    this.inputValue = [];
  }

  _getInputValues = () => {
    this._popupForm.querySelectorAll('input').forEach((item, i) => {
      this.inputValue[i] = item.value;
    });
  }
  _setEventListeners = () => {
    this._popupForm.addEventListener('submit', this._handleSubmitForm);
    this._popup.addEventListener('click', this._handleEscClose);
    this._closeBtn.addEventListener('click', this._handleEscClose);
    window.addEventListener('keyup', this._handleEscClose);
  }

  _removeEventListeners = () => {
    this._popup.removeEventListener('click', this._handleEscClose);
    this._closeBtn.removeEventListener('click', this._handleEscClose);
    window.removeEventListener('keyup', this._handleEscClose);
    this._popupForm.removeEventListener('submit', this._handleSubmitForm);
  }
  

  close = () => {
    this._popup.classList.remove('popup_opened');
    document.querySelector('.page').classList.remove('overflow-hidden');
    this._removeEventListeners();
    this._popupForm.reset();
  }
}