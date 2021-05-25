class Card {
  // {name, link, likes, cardId, ownerId, userId}, templateSelector, handleOpenPopup, handleDeleteCard
  constructor(
    {name, link, likes, cardId, userId, ownerId},
      templateSelector, handleOpenPopup,
      handleDeletCard, handleLikeCard) {
    this._name = name;
    this._link = link;
    this._like = likes;
    this._ownerId = ownerId;
    this._userId = userId;
    this._cardId = cardId;
    this._templateSelector = templateSelector;
    this._handleOpenPopup = handleOpenPopup;
    this._handleDeletCard = handleDeletCard;
    this._handleLikeCard = handleLikeCard;
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
  // получаем id карточки
  getCardId() {
    return this._cardId;
  }
  // установка слушателей
  _setEventListeners = () => {
    this._imageElement.addEventListener('click', () => {
      this._handleOpenPopup(this._name, this._link);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this._likeButton, this._cardId, this._likeCount);
      this._likeButton.classList.toggle('photocard__like-btn_active');
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeletCard(this._element);
    });
  }
  // удаление карточки
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  // проверка есть ли мой лайк на загруженной карточке(если он есть то поставить)
  _checkLike = () => {
    this._like.forEach((card) => {
      if(card._id === this._userId) {
        this._likeButton.classList.add('photocard__like-btn_active');
      }
    })
  }
  // Проверка нужно ли ставить на карточку иконку корзины
  _checkTrashIcon = () => {
    if(this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
  }
  // публичный метод генерирущий карточку, возвращает dom element
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector('.photocard__image');
    this._titleElement = this._element.querySelector('.photocard__title');
    this._likeButton = this._element.querySelector('.photocard__like-btn');
    this._likeCount = this._element.querySelector('.photocard__like-value');
    this._deleteButton = this._element.querySelector('.photocard__delet-btn');
    // делаем проверку на лайк, иконку удаления, вешаем слушатель
    this._checkLike();
    this._checkTrashIcon();
    this._setEventListeners();
    // присваиваем значения в карточку
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    // Вставляем счетчик лайка
    this._likeCount.textContent = this._like.length;

    return this._element;
  }
}

export default Card;