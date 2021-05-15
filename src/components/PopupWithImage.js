import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor() {
    super('.popup_type_image');
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__title-image');
  }

  open = ({name, link}) => {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
  }
}