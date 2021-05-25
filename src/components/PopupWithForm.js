import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('form');
    this._popupButton = this._popupForm.querySelector('.popup__submit');
    this._handleSubmitForm = handleSubmit;
    this._firstTextButton = this._popupButton.textContent;
  }

  renderLoading(value) {
    if(value) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = this._firstTextButton;
    }
  }

  _getInputValues = () => {
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    this._handleSubmitForm(this._getInputValues());
  }

  _setEventListeners = () => {
    super._setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener('submit', this._handleSubmit);
  }
}