class Card {
  constructor(cardData, templateSelector, handleOpenPopup) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
  }
  // получаем шаблон
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photocard__item')
      .cloneNode(true);

    return cardElement;
  }
  // like card
  _handleLikeCard() {
    this._likeButton.classList.toggle('photocard__like-btn_active');
  }
  // deletCard
  _handleDeletCard() {
    this._element.remove();
  }
  // установка слушателей
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
      // this._setSettingsPopup(this._name, this._link);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeletCard();
    });
  }
  // публичный метод генерирущий карточку, возвращает dom element
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.photocard__image');
    this._titleElement = this._element.querySelector('.photocard__title');
    this._likeButton = this._element.querySelector('.photocard__like-btn');
    this._deleteButton = this._element.querySelector('.photocard__delet-btn');
    this._setEventListeners();

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    return this._element;
  }
}

export default Card;