import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(name, link, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__title-image');
  }

  _renderInfoPopup = () => {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
  }

  open = () => {
    this._renderInfoPopup();
    this._popup.classList.add('popup_opened');
    document.querySelector('.page').classList.add('overflow-hidden');
    this._setEventListeners();
  }
}