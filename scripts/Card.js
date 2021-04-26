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
    this._element.querySelector('.photocard__like-btn').classList.toggle('photocard__like-btn_active');
  }
  // deletCard
  _handleDeletCard() {
    this._element.remove();
  }
  // установка слушателей
  _setEventListeners() {
    this._element.querySelector('.photocard__image').addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
      // this._setSettingsPopup(this._name, this._link);
    });
    this._element.querySelector('.photocard__like-btn').addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._element.querySelector('.photocard__delet-btn').addEventListener('click', () => {
      this._handleDeletCard();
    });
  }
  // публичный метод генерирущий карточку, возвращает dom element
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photocard__image').src = this._link;
    this._element.querySelector('.photocard__image').alt = this._name;
    this._element.querySelector('.photocard__title').textContent = this._name;

    return this._element;
  }
}

export default Card;